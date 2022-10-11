import React, { useEffect, useRef, useState} from 'react'
import Transaction from '../../components/transaction/Transaction'
import "./Home.css"

import { userRequest } from '../../requestMethod';
import { useNavigate } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { toast } from 'react-toastify';
import { logout } from "../../redux/apiCalls"
import { useDispatch, useSelector } from "react-redux";import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import BalanceLoadedDetailTable from '../../components/balanceloadeddetailtable/BalanceLoadedDetailTable';
import MyTransactions from '../../components/myTransactions/MyTransactions';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const Home = () => {
  const roles = useSelector(state=> state?.user?.currentuser?.data?.roles);
  const [userRoles,setUserRoles]=useState(roles);
  console.log(roles)
  const handleChange = (event, value) => {
    setPageNumber(value-1);
  };
  const [totalNoOfPages,settotalNoOfPages] = useState(0);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const navigate=useNavigate();
  const [name,setName] = useState(null);
  const dispatch = useDispatch();
  const [currentBalance,setcurrentBalance] = useState(null);
  const [loadedBalanceDetail,setloadedBalanceDetail] = useState([]);
  const [pageNumber,setPageNumber] = useState(0);

  const [loadedBalancepageNumber,setloadedBalancePageNumber] = useState(0);
  const [loadedBalancetotalNoOfPages,setloadedBalancetotalNoOfPages] = useState(0);

  const handleloadedBalanceChange = (event, value) => {
    setloadedBalancePageNumber(value-1);
  };

  const loadFrom=useRef();
  const loadAmount = useRef();

  const loadBalanceSubmit = async(e)=>{
e.preventDefault();
try{
const data = {loadedFrom:loadFrom.current.value,amount:Number(loadAmount.current.value).toFixed(2)}
if(data?.loadedFrom.length !==0 && data?.amount > 500.0 ){
const result = await userRequest.post("/user/load/balance",data);
handleClose();
toast(result?.data?.message);
}else{
  toast("loaded from can't be empty and amount must be valid number above 500");
}
}catch(err){
  console.log(err)
  // toast("Something goes wrong");
  err?.response?.data?.message && toast( err?.response?.data?.message);
}
  }

  useEffect(()=>{
    const fetchData=async()=>{
      const balanceloadedDetail = await userRequest.post(`loadedbalancedetail/my`,{pageNumber:loadedBalancepageNumber,pageSize:5});
console.log("loaded balance : "+balanceloadedDetail);
setloadedBalancetotalNoOfPages(balanceloadedDetail?.data?.data?.totalNoOfPages)
      setloadedBalanceDetail(balanceloadedDetail?.data?.data?.content);
      console.log("loaded balance detail :: ", loadedBalanceDetail);
  }
fetchData();
  },[loadedBalancepageNumber])

  useEffect(()=>{
      const fetchData=async()=>{
          const user = await userRequest.get(`user/me/detail`);
          console.log(user?.data?.data)
          setName(user?.data?.data?.userName);
          setcurrentBalance(user?.data?.data?.balance);
      }
   fetchData();
  },[])

  const allTransactions = async() =>{
    try{

      let myroles = userRoles.filter(role=> (role.name ===  "TRANSACTION"  || role.name ==="ADMIN-SUPPORT" || role.name==="ADMIN"));
      if(myroles.length>0){
      navigate("/transactions");
      }else{
toast("Not Allowed.");
      }
  }catch(err){
    console.log("error" + err)
    toast(err);
  }
  }

  const admin = async()=>{
    try{
      let myroles = userRoles.filter(role=> (role.name ==="ADMIN-SUPPORT" || role.name==="ADMIN"));
      if(myroles.length>0){
      navigate("/admin");
      }else{
toast("Not Allowed.");
      }
  }catch(err){
    console.log("error" + err)
    toast(err);
  }
  }
  const logoutClicked = () => {
    logout(dispatch);
  }
  return (
    <div className='home'>
        <div className="homeContainer">
            <div className="homeHeader">
              <div className="homeTop">
              <h2>Welcome <span>{name}</span></h2>
<h2>Your Balance :: {Number(currentBalance).toFixed(2)}</h2>
<Button onClick={handleOpen} variant='outlined'>Load Balance</Button>
<Button onClick={logoutClicked}>Log-out</Button>
              </div>
                <Transaction name={name}/>
            </div>
            <div className="homeBody">
            <Button onClick={allTransactions}>All Transactions</Button>
              <Button onClick={admin}>ADMIN</Button>

              <MyTransactions/>

    {/* balance loaded */}
    <h2 style={{margin:"12px 0px"}}>Balance Loaded History</h2>
   <BalanceLoadedDetailTable balanceloadedDetail={loadedBalanceDetail}></BalanceLoadedDetailTable>
    <Stack spacing={5}>
      <Pagination count={loadedBalancetotalNoOfPages} page={loadedBalancepageNumber+1} onChange={handleloadedBalanceChange} />
    </Stack>

            </div>

            <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h1" fontWeight={700}>
            Load Balance
          </Typography>
          <form className='loadBalanceForm'>
            <p>Load from</p>
            <input type="text" ref={loadFrom} placeholder='from?' />
            <p>Total amount</p>
            <input type="number" ref={loadAmount} placeholder='amount?' />
            <Button variant='contained' className='loadbutton' onClick={loadBalanceSubmit}>Load</Button>
          </form>
        </Box>
      </Modal>

        </div>
    </div>
  )
}

export default Home
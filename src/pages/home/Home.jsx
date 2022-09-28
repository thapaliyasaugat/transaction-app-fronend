import React, { useEffect, useState, useContext } from 'react'
import Transaction from '../../components/transaction/Transaction'
import "./Home.css"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from "@mui/material/Button"
import { userRequest } from '../../requestMethod';
import { useNavigate } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { toast } from 'react-toastify';
import { logout } from "../../redux/apiCalls"
import { useDispatch, useSelector } from "react-redux";
const Home = () => {
  const navigate=useNavigate();
  const [name,setName] = useState(null);
  const dispatch = useDispatch();
  const [currentBalance,setcurrentBalance] = useState(null);
  const [pageNumber,setPageNumber] = useState(0);
  const [totalNoOfPages,settotalNoOfPages] = useState(0);
  const [transactions,setTransactions] = useState([])
  const [searchStatus,setSearchStatus] = useState("ALL")
  const handleChange = (event, value) => {
    setPageNumber(value-1);
  };
  useEffect(()=>{
      const fetchData=async()=>{
      //   // console.log("eamil :: " , email)
      //   const config = {
      //     headers:{
      //       HEADER_STRING: "token"
      //     }
      //   };
      //   const user = await axios.get("http://localhost:8080/user/me/detail",config)
          const user = await userRequest.get(`user/me/detail`);
          console.log(user?.data?.data)
          setName(user?.data?.data?.userName);
          setcurrentBalance(user?.data?.data?.balance);
          let myTransactions = null;
          if(searchStatus == "ALL"){ myTransactions = await userRequest.post("transaction/my_transactions?filter=all",{pageNumber:pageNumber,pageSize:5})};
          if(searchStatus == "SEND"){myTransactions = await userRequest.post("transaction/my_transactions?filter=SEND",{pageNumber:pageNumber,pageSize:5})};
          if(searchStatus == "RECEIVED"){myTransactions = await userRequest.post("transaction/my_transactions?filter=RECEIVED",{pageNumber:pageNumber,pageSize:5})};
          console.log("mytransactions :: " + myTransactions);
          settotalNoOfPages(myTransactions?.data?.data?.totalNoOfPages)
          setTransactions(myTransactions?.data?.data?.content);
          // console.log("transactios :: " ,transactions )
      }
   fetchData();
  },[pageNumber,searchStatus])

  const allTransactions = async() =>{
    try{
    console.log("alll transactions clicked.");
    const transactions = await userRequest.post("/transaction/list",{pageNumber:0,pageSize:5});
    console.log(transactions)
      navigate("/transactions");
  }catch(err){
    console.log("error" + err)
    toast(err?.message);
    toast(err?.response?.data?.message);
  }
  }

  const admin = async()=>{
try {
  console.log("Admin clicked");
  const admin = await userRequest.post("/user/",{pageNumber:0,pageSize:5});
  console.log(admin);
  navigate("/admin")
} catch (error) {
  console.log("error" + error);
  toast("Not Allowed");
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
<Button onClick={logoutClicked}>Log-out</Button>
              </div>
                <Transaction name={name}/>
            </div>
            <div className="homeBody">
            <Button onClick={allTransactions}>All Transactions</Button>
              <Button onClick={admin}>ADMIN</Button>
              <h2 style={{marginBottom:"12px"}}>MY Transactions</h2>
              <div>
                <Button variant={searchStatus=="ALL" && "contained"} onClick={()=>(setSearchStatus("ALL"),setPageNumber(0))}>All</Button>
                <Button variant={searchStatus=="SEND" && "contained"} onClick={()=>(setSearchStatus("SEND"),setPageNumber(0))}>Send</Button>
                <Button variant={searchStatus=="RECEIVED" && "contained"} onClick={()=>(setSearchStatus("RECEIVED"),setPageNumber(0))}>Received</Button>
              </div>
            <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell align="right">Code</TableCell>
            <TableCell align="right">Sender</TableCell>
            <TableCell align="right">Receiver</TableCell>
            <TableCell align="right">Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions?.length !== 0 ? transactions.map((transaction) => (
            <TableRow
              key={transaction.code}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {transaction?.id}
              </TableCell>
              <TableCell align="right">{transaction?.code}</TableCell>
              <TableCell align="right">{transaction?.customer_from?.userName}</TableCell>
              <TableCell align="right">{transaction?.customer_to?.userName}</TableCell>
              <TableCell align="right">{transaction.amount}</TableCell>
            </TableRow>
          ))
        :<h2>No Transactions Performed</h2>}
        </TableBody>
      </Table>
    </TableContainer>
    <Stack spacing={5}>
      <Pagination count={totalNoOfPages} page={pageNumber+1} onChange={handleChange} />
    </Stack>
            </div>
        </div>
    </div>
  )
}

export default Home
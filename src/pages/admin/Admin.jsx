import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import "./Admin.css"
import { userRequest } from '../../requestMethod';
import { toast } from 'react-toastify';
import BackHome from '../../components/BackHome';
import CreateCashbackScheme from '../../components/createCashbackScheme/CreateCashbackScheme';
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
const Admin = () => {
const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const [currentUser, setCurrentUser] = React.useState(null);
  const handleOpen = (user) => {setOpen(true); setCurrentUser(user)};
  const handleClose = () => setOpen(false);
  const [userDetail,setUserDSetail] = useState([]);
  const [userRoles,setUserRoles] = useState([]);
  const [pageNumber,setPageNumber] = useState(0);
  const [totalNoOfPages,settotalNoOfPages] = useState(0);

  const [roleOpen, setRoleOpen] = React.useState(false);
  const handleRoleOpen = (user) => {setRoleOpen(true); setCurrentUser(user);};
  const handleRoleClose = () => setRoleOpen(false);

  const handleChange = (event, value) => {
    setPageNumber(value-1);
  };

  useEffect(() => {
    const fetchData = async()=>{
        const users = await userRequest.post("/user/",{pageNumber,pageSize:5});
        console.log(users);
        setUserDSetail(users?.data?.data?.content);
        settotalNoOfPages(users?.data?.data?.totalNoOfPages);
    }
    fetchData();
  
  }, [pageNumber])

  const statusUpdate = async()=>{
    try{
      const updateUserStatus = await userRequest.get(currentUser?.status=="ACTIVE" ? `/admin/block/${currentUser?.id}` : `/admin/activate/${currentUser?.id}`)
      console.log(updateUserStatus);
      window.location.reload();
      handleClose();
    }catch(err){
      console.log(err);
      toast("Something goes wrong.")
      handleClose();
    }
      }
  const getRoleOfuser = async(user)=>{
    try {
      const userRoles = await userRequest.get(`/admin/role/${user?.id}`);
      setUserRoles(userRoles.data.data);
console.log("userRoles :: " + userRoles);
    } catch (error) {
      console.log("somethn goes wrong fetching user roles.")
    }
  }
  const giveAdminAccess = async()=>{
    try{
    const updateDetail = {updateRoleOfEmail:currentUser?.email,roleName:"ADMIN"};
      const updateRole = await userRequest.put("/admin/update/role",updateDetail);
      handleRoleClose();
      toast("role updated successfully");

    }catch(err){
      console.log(err);
toast("Some error occoured.")
    }
  }
  const giveTransactionAccess = async()=>{
    try{
    const updateDetail = {updateRoleOfEmail:currentUser?.email,roleName:"TRANSACTION"};
    const updateRole = await userRequest.put("/admin/update/role",updateDetail)
    console.log("set transactions" , updateRole)
    handleRoleClose();
    toast("role updated successfully");

    }catch(err){
      console.log(err);
      toast("some error occoured.")
    }
  }
  return (
    <div className='admin'>
        <div className="adminContainer">
          <BackHome/>
<h2 style={{marginBottom:"12px"}}>All users with roles and active status</h2>
<TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell align="right">userName</TableCell>
            <TableCell align="right">email</TableCell>
            <TableCell align="right">status</TableCell>
            <TableCell align="right">balance</TableCell>
            <TableCell align="right">roles</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userDetail.map((user) => (
            <TableRow
              key={user?.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {user.id}
              </TableCell>
              <TableCell align="right" >{user?.userName}</TableCell>
              <TableCell align="right">{user?.email}</TableCell>
              <TableCell align="right" ><Button onClick={()=>handleOpen(user)}>{user?.status}</Button></TableCell>
              <TableCell align="right">{Number(user?.balance).toFixed(2)}</TableCell>
              <TableCell align="right"><Button onClick={()=>{getRoleOfuser(user); handleRoleOpen(user);}}>updateRole</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    <Stack spacing={5} className="adminAllUserStack">
      <Pagination count={totalNoOfPages} page={pageNumber+1} onChange={handleChange} />
    </Stack>
    <Button onClick={()=>navigate("/allcashbackschemes")} variant='contained' className='adminAllCashback'>All Cashback Schemes</Button>
    <CreateCashbackScheme/>

    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
           {currentUser?.status == "ACTIVE" ?  "Do You want to block this user" : "Do you want to activate this user"}
          </Typography>
        <Button onClick={statusUpdate}>Update</Button>
        </Box>
      </Modal>

      <Modal
        open={roleOpen}
        onClose={handleRoleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            userName : {currentUser?.userName}
            </Typography>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            userEmail : {currentUser?.email}
            </Typography>
          <Typography id="modal-modal-title" variant="h6" component="h2">
          Current roles::
          {userRoles?.map(role=><p>{role.name}</p>)}
          </Typography>
{(userRoles.find(role=>role.name=="CUSTOMER") && userRoles.find(role=>role.name=="TRANSACTION") && !userRoles.find(role=>role.name=="ADMIN")) &&   
         <Button variant='contained' onClick={giveAdminAccess}>give Admin Access</Button> 
}
{(userRoles.find(role=>role.name=="CUSTOMER")  && !userRoles.find(role=>role.name=="TRANSACTION") && !userRoles.find(role=>role.name=="ADMIN"))&&   
         <Button variant='contained' onClick={giveTransactionAccess}>give Transactions Access</Button> 
}
{(userRoles.find(role=>role.name=="ADMIN"))&&   
         <h2>{currentUser?.userName} is ADMIN...</h2>
}

        </Box>
      </Modal>
        </div>
    </div>
  )
}

export default Admin
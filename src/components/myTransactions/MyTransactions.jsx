import React, { useEffect , useRef, useState} from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { userRequest } from '../../requestMethod';
import { useNavigate } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import "./myTransactions.css"
import { toast } from 'react-toastify';


const MyTransactions = () => {
  const handleChange = (event, value) => {
    setPageNumber(value-1);
  };
    const [totalNoOfPages,settotalNoOfPages] = useState(0);
    const [transactions,setTransactions] = useState([]);
    const [searchStatus,setSearchStatus] = useState("ALL")
    const [pageNumber,setPageNumber] = useState(0);
    const [trigger,setTrigger] = useState(false);
    const startDate = useRef();
    const endDate = useRef();
    const code = useRef();
    const fromAmount = useRef();
    const toAmount = useRef();
useEffect(()=>{
    const fetchData=async()=>{
      try{
        const filterData = {
          pageNumber:pageNumber,
          pageSize:5,
          filter:searchStatus,
          fromDate:startDate.current.value?startDate.current.value:null,
          toDate:endDate.current.value?endDate.current.value:null,
          fromAmount:fromAmount.current.value?fromAmount.current.value:null,
          toAmount:toAmount.current.value?toAmount.current.value:null,
          code:code.current.value?code.current.value:null,
        }
        let myTransactions = await userRequest.post("transaction/my_transactions",filterData) 
        toast(myTransactions?.message)
        settotalNoOfPages(myTransactions?.data?.data?.totalNoOfPages)
        setTransactions(myTransactions?.data?.data?.content);
      }catch(err){
        toast(err?.response?.data?.message)
      }
    }
 fetchData();
},[pageNumber,searchStatus,trigger])

const filterClicked = ()=>{
  console.log("from ::" , startDate.current.value);
  console.log("to ::" , endDate.current.value);
  
  if(fromAmount.current.value=="" && toAmount.current.value!=="" ||
    fromAmount.current.value!=="" && toAmount.current.value=="" ||
    startDate.current.value=="" && endDate.current.value!=="" ||
    startDate.current.value!=="" && endDate.current.value==""){
toast("Provide all valid relative parameter.");
    }else{
  setPageNumber(0);
  setTrigger(!trigger)
    }
}
const clearFilter= ()=>{
  code.current.value = "";
  startDate.current.value = "";
  endDate.current.value = "";
  fromAmount.current.value="";
  toAmount.current.value="";
  setPageNumber(0);
setSearchStatus("ALL");
}

  return (
    <div>
    <h2 style={{marginBottom:"12px"}}>MY Transactions</h2>
    <div>
      <Button variant={searchStatus==="ALL" && "contained"} onClick={()=>(setSearchStatus("ALL"),setPageNumber(0))}>All</Button>
      <Button variant={searchStatus==="SEND" && "contained"} onClick={()=>(setSearchStatus("SEND"),setPageNumber(0))}>Send</Button>
      <Button variant={searchStatus==="RECEIVED" && "contained"} onClick={()=>(setSearchStatus("RECEIVED"),setPageNumber(0))}>Received</Button>
    </div>
    <div className="myTransactionsFilter">
      <div>
        <h3>FromDate : </h3>
      <input type="date" ref={startDate} placeholder='start date: yyyy-mm-dd'/>
      </div>
      <div>
        <h3>ToDate : </h3>
      <input type="date" ref={endDate} placeholder='end date: yyyy-mm-dd' />
      </div>
    
      <div>
        <h3>From Amount : </h3>
      <input type="number" ref={fromAmount}/>
      </div>

      <div>
        <h3>To Amount : </h3>
      <input type="number" ref={toAmount}/>
      </div>
      <div>
        <h3>Code : </h3>
      <input type="text" ref={code}/>
      </div>
      <div>
      <button onClick={clearFilter}>clear Filter</button>
    <button onClick={filterClicked}>Filter</button>
    </div>
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
:<p>No Transactions Performed</p>}
</TableBody>
</Table>
</TableContainer>

<Stack spacing={5}>
<Pagination count={totalNoOfPages} page={pageNumber+1} onChange={handleChange} />
</Stack></div>
  )
}

export default MyTransactions
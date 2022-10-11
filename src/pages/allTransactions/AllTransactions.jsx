import React, { useEffect, useRef, useState } from 'react'

import "./AllTransactions.css"
import { Button } from '@mui/material';
import { userRequest } from '../../requestMethod';
import { toast } from 'react-toastify';
import TableData from '../../components/table/TableData';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Search } from '@mui/icons-material';
import BackHome from "../../components/BackHome"
const AllTransactions = () => {
  const [transactions,setTransactions] = useState([]);
  const codeValue = useRef();
  const startDate = useRef();
  const endDate = useRef();
  const fromAmount = useRef();
  const toAmount = useRef();
  const userEmail = useRef();
  const [pageNumber,setPageNumber] = useState(0);
  const [trigger,setTrigger] = useState(false);
  const [totalNoOfPages,settotalNoOfPages] = useState(0);
  const [searchStatus,setSearchStatus] = useState("all");

  const handleChange = (event, value) => {
    setPageNumber(value-1);
  };

  useEffect(()=>{
    const fetchData = async()=>{
      try{
        const filterData = {
          pageNumber:pageNumber,
          pageSize:5,
          filter:searchStatus,
          fromDate:startDate.current.value?startDate.current.value:null,
          toDate:endDate.current.value?endDate.current.value:null,
          fromAmount:fromAmount.current.value?fromAmount.current.value:null,
          toAmount:toAmount.current.value?toAmount.current.value:null,
          code:codeValue.current.value?codeValue.current.value:null,
        }
        let user = userEmail.current.value.length !==0 ? userEmail.current.value : null;
        let allTransactions = await userRequest.post( user != null 
                                                        ? `transaction/list?email=${user}` 
                                                        :`transaction/list`,filterData);
        console.log("all transactions :: " , allTransactions);
        toast(allTransactions?.message)
        setTransactions(allTransactions?.data?.data?.content);
        settotalNoOfPages(allTransactions?.data?.data?.totalNoOfPages)
    }catch(err){
      console.log("Erro :: " + err)
      toast(err?.response?.data?.message)
    }
    }

    fetchData();
    
},[pageNumber,searchStatus,trigger])
    const clearFilter= ()=>{
      codeValue.current.value = "";
      startDate.current.value = "";
      endDate.current.value = "";
      fromAmount.current.value="";
      toAmount.current.value="";
      userEmail.current.value="";
      setPageNumber(0);
setSearchStatus("ALL");
    }

  return (
    <div className='allTransactions'>
        <div className="allTransactionsContainer">
          <BackHome/>
            <h2 style={{marginBottom:"12px"}}>All Transactions</h2>
            <div className='transictionFilter'>
              <div className='filterTop'>
                
                  <form className='transactionFilterSearch'>
                      <Search/>
                      <input type="text" placeholder='enter code to search.'ref={codeValue}/>
                      <button onClick={(e)=>{e.preventDefault(); setTrigger(!trigger); setPageNumber(0); setSearchStatus("code")}}>Search</button>
                  </form>
                <div className="transactionByFilter">
                    <div>
                      <h2>From : </h2>
                      <input type="date" ref={startDate} placeholder='start date: yyyy-mm-dd' />
                      
                    </div>
                    <div>
                      <h2>To : </h2>
                      <input type="date" ref={endDate} placeholder='end date: yyyy-mm-dd' />
                      
                    </div>
                    <div>
                      <h2>FromAmount : </h2>
                      <input type="text" ref={fromAmount} placeholder='start amount' />
                      
                    </div>
                    <div>
                      <h2>ToAmount : </h2>
                      <input type="text" ref={toAmount} placeholder='last amount' />
                    </div>
                    <div>
                      <h2>User : </h2>
                      <input type="text" ref={userEmail} placeholder='email of user' />
                    </div>
                    {/* {userEmail?.current?.value=="" && 
                    <div>
                    <Button variant={searchStatus==="ALL" && "contained"} onClick={()=>(setSearchStatus("ALL"),setPageNumber(0))}>All</Button>
                    <Button variant={searchStatus==="SEND" && "contained"} onClick={()=>(setSearchStatus("SEND"),setPageNumber(0))}>Send</Button>
                    <Button variant={searchStatus==="RECEIVED" && "contained"} onClick={()=>(setSearchStatus("RECEIVED"),setPageNumber(0))}>Received</Button>
                  </div>
                   } */}
                    <button onClick={()=>{setPageNumber(0); setTrigger(!trigger); setSearchStatus("dateInterval");
console.log("endDate :: " + endDate.current.value);
                  
                  }}>Search</button>
                  </div>
                 
              </div>
              <Button onClick={clearFilter}>clear Filter</Button>
           </div>
            <TableData transactions={transactions}/>
            <Stack spacing={5}>
              <Pagination count={totalNoOfPages} page={pageNumber+1} onChange={handleChange} />
            </Stack>
        </div>
    </div>
  )
}

export default AllTransactions
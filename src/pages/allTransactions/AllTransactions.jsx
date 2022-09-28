import React, { useEffect, useRef, useState } from 'react'

import "./AllTransactions.css"
import { Button } from '@mui/material';
import { userRequest } from '../../requestMethod';
import { toast } from 'react-toastify';
import TableData from '../../components/table/TableData';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Search } from '@mui/icons-material';
const AllTransactions = () => {
  const [transactions,setTransactions] = useState([]);
  const codeValue = useRef();
  const startDate = useRef();
  const endDate = useRef();
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
        let allTransactions;
        if(searchStatus == "all") allTransactions = await userRequest.post("/transaction/list",{pageNumber:pageNumber,pageSize:8});
        if(searchStatus == "code") allTransactions = await userRequest.post("/transaction/code",{code:codeValue.current.value});
        if(searchStatus == "dateInterval") allTransactions = await userRequest.post(`/transaction/time/between?fromDate=${startDate.current.value}&toDate=${endDate.current.value}`,{pageNumber,pageSize:8});
        console.log(allTransactions);
        setTransactions(allTransactions?.data?.data?.content);
        settotalNoOfPages(allTransactions?.data?.data?.totalNoOfPages)
    }catch(err){
      console.log("Erro" + err)
      toast(err.response.status==403 && "Unauthorized.");
      toast(err.response.status==400 && "Bad Request");
    }
    }

    fetchData();
    
},[pageNumber,searchStatus,trigger])
    const clearFilter= ()=>{
      codeValue.current.value = "";
      startDate.current.value = "";
      endDate.current.value = "";
      setPageNumber(0);
setSearchStatus("all");
    }

  return (
    <div className='allTransactions'>
        <div className="allTransactionsContainer">
            <h2 style={{marginBottom:"12px"}}>All Transactions</h2>
            <div className='transictionFilter'>
              <div className='filterTop'>
                
                  <form className='transactionFilterSearch'>
                      <Search/>
                      <input type="text" placeholder='enter code to search.'ref={codeValue}/>
                      <button onClick={(e)=>{e.preventDefault(); setTrigger(!trigger); setPageNumber(0); setSearchStatus("code")}}>Search</button>
                  </form>
                <div className="transactionByDate">
                    <div>
                      <h2>From : </h2>
                      <input type="date" ref={startDate} placeholder='start date: yyyy-mm-dd' />
                      
                    </div>
                    <div>
                      <h2>To : </h2>
                      <input type="date" ref={endDate} placeholder='end date: yyyy-mm-dd' />
                      
                    </div>
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
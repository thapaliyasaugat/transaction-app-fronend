import React,{useRef} from 'react'
import "./Transaction.css"
import {toast} from "react-toastify"
import Button from "@mui/material/Button"
import { userRequest } from '../../requestMethod'
const Transaction = ({name}) => {
    const id = useRef();
    const amount = useRef();
    const makeTransaction = async(e)=>{
        e.preventDefault();
        // var numbers = /^[0-9]+$/;
        var numbers = /^\$?[0-9]?((\.[0-9]+)|([0-9]+(\.[0-9]+)?))$/;
        var email = /\S+@\S+\.\S+/;
        const payload = {
            toUser:id.current.value.match(email) ? id.current.value : null,
            amount:amount.current.value.match(numbers) ? Number(parseFloat(amount.current.value)).toFixed(2) : null
        }
console.log(payload)
        try{
            const transaction = await userRequest.post("/transaction/create",payload);
            console.log(transaction)
            toast("transaction successfull.");
        }catch(err){
            err?.response?.data?.message && toast(err.response.data.message);
            err?.response?.data?.amount && toast(err.response.data.amount);
            err?.response?.data?.toUser && toast(err.response.data.toUser);
            console.log(err);
        }
        
    }
  return (
    <div className='transaction'>
        <div className="transactionContainer">
            <h1>Perform Transaction</h1>
            <div className='transactionContent'>
                <div className='fromTransaction'>
                    <h3>From :</h3>
                    <h3>{name}</h3>
                </div>
                <div className='toTransaction'>
                    <h3>To :</h3>
                    <input type="text" ref={id} placeholder='email of user' />
                </div>
                <div className='amountTransaction'>
                    <h3>Amount :</h3>
                    <input type="text" ref={amount} placeholder='amount' />
                </div>
            </div>
            <Button style={{width:"50%"}} variant="contained" onClick={(e)=>makeTransaction(e)}>Proceed</Button>
        </div>
    </div>
  )
}

export default Transaction
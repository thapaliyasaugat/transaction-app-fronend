import React, { useRef } from 'react'
import Button from "@mui/material/Button"
import { Link,useNavigate } from "react-router-dom";
import {publicRequest} from "../../requestMethod"
import { toast } from 'react-toastify';
import "./Register.css"
const Register = () => {
  const navigate = useNavigate();
  const userName = useRef();
  const email = useRef();
  const password = useRef();
  const formSubmit = (e)=>{
    console.log("clicked")
    e.preventDefault();
    const makeRequest = async()=>{
      try{
        const user = await publicRequest.post("/auth/signup", {userName : userName.current.value,
        email:email.current.value,
        password:password.current.value});
        toast("user registered successfully.")
        navigate("/login");
      }
      catch(err){
        err?.response?.data?.password && toast(err?.response?.data?.password)
        err?.response?.data?.email && toast(err?.response?.data?.email)
        err?.response?.data?.userName && toast(err?.response?.data?.userName)
      }
    }
    makeRequest();
  }
  return (
    <div className='register'>
      <div className="registerContainer">
        <h2>SpringBoot Transaction</h2>
        <form>
          <input type="text" ref={userName} placeholder='username' />
          <input type="text" ref={email} placeholder='eamil' />
          <input type="password" ref={password} placeholder='password' />
          <Button variant="contained" onClick={(e)=>formSubmit(e)}>Submit</Button>
        </form>
        <p>Already have account <Link to="/login">login here.</Link></p>
      </div>
    </div>
  )
}

export default Register
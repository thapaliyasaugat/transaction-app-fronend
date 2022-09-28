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
        console.log(user);
        toast("user registered successfully.")
        navigate("/login");
      }
      catch(err){
        console.log("err" + err?.password);
        err?.response?.password && toast(err?.response?.password)
        err?.response?.email && toast(err?.response?.email)
        err?.response?.userName && toast(err?.response?.userName)
        toast(err.message)
      }
    }
    makeRequest();
  }
  return (
    <div className='register'>
      <div className="registerContainer">
        <h2>SpringBoot Security Demo</h2>
        <form>
          <input type="text" ref={userName} placeholder='username' />
          <input type="text" ref={email} placeholder='eamil' />
          <input type="password" ref={password} placeholder='password' />
          <Button variant="contained" onClick={(e)=>formSubmit(e)}>Submit</Button>
        </form>
        <p>Already have account <Link to="/login">login here.</Link></p>
        {/* <Alert severity="success" color="info">
      User Registered Sucessfully.
    </Alert> */}
      </div>
    </div>
  )
}

export default Register
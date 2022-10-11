import React, { useRef, useState } from 'react'
import Button from "@mui/material/Button"
import { Link } from "react-router-dom";

import "./Login.css"
import { login } from '../../redux/apiCalls';
import Home from '../home/Home';
import { useDispatch } from 'react-redux';
const Login = () => {
  const dispatch = useDispatch();
  const email = useRef();
  const password = useRef();
  const [user,setUser] = useState(null);
  const formSubmit = (e)=>{
    e.preventDefault();
    const userCred = {
      email:email.current.value,
      password:password.current.value
    }
    login(dispatch,userCred);
  }
  return (
    <>
{ user == null &&  <div className='login'>
    <div className="loginContainer">
      <h2>SpringBoot Transaction</h2>
      <form>
        <input type="text" ref={email} placeholder='eamil' />
        <input type="password" ref={password} placeholder='password' />
        <Button variant="contained" onClick={(e)=>formSubmit(e)}>Submit</Button>
      </form>
      <p>Doesn't have account <Link to="/">signup here.</Link></p>
    </div>
  </div>}
 {user!=null && <Home/>}
 </>
  )
}

export default Login
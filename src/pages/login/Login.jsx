import React, { useRef, useState } from 'react'
import Button from "@mui/material/Button"
import { Link,useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import {UserContext} from "../../helpers/UserContext"

import "./Login.css"
import { login } from '../../redux/apiCalls';
import Home from '../home/Home';
import { useDispatch } from 'react-redux';
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const email = useRef();
  const password = useRef();
  const [user,setUser] = useState(null);
  const [token,setToken] = useState("");
  const formSubmit = (e)=>{
    // console.log("clicked")
    e.preventDefault();
    const userCred = {
      email:email.current.value,
      password:password.current.value
    }
    login(dispatch,userCred);
    // console.log(userCred)
//     const makeRequest = async()=>{
//       try{
//       const user = await publicRequest.post("/auth/signin",userCred);
//       localStorage.setItem("security_token",user.data.data.token)
//       localStorage.setItem("userName",user.data.data.userName)
//       setToken(user?.data?.token)
// setUser(user?.data?.userName);
// console.log(user);
    
// // navigate("/home")
// toast("user logged in.")

//       }catch(err){
//         console.log(err?.response?.data?.email)
  
//           err?.response?.data?.message && toast(err?.response?.data?.message)
//           err?.response?.data?.password && toast(err?.response?.data?.password)
//           err?.response?.data?.email && toast(err?.response?.data?.email)
        
//       }
//   }
  // makeRequest();

  }
  return (
    <UserContext.Provider value={{token}}>
{ user == null &&  <div className='login'>
    <div className="loginContainer">
      <h2>SpringBoot Security Demo</h2>
      <form>
        <input type="text" ref={email} placeholder='eamil' />
        <input type="password" ref={password} placeholder='password' />
        <Button variant="contained" onClick={(e)=>formSubmit(e)}>Submit</Button>
      </form>
      <p>Doesn't have account <Link to="/">signup here.</Link></p>
    </div>
  </div>}
 {user!=null && <Home/>}
  </UserContext.Provider>
  )
}

export default Login
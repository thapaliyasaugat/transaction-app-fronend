import { ArrowBack } from '@mui/icons-material'
import { display } from '@mui/system';
import React from 'react'
import { useNavigate } from 'react-router-dom'

const BackHome = () => {
    const navigate = useNavigate();
    const backHomeClicked = ()=>{
        navigate("/home");
    }
  return (
    <div style={{display:'flex',alignItems:'center',margin:'15px 0px',cursor:'pointer'}} onClick={backHomeClicked}>
        <ArrowBack style={{color:'blue'}}/>
        Back Home
    </div>
  )
}

export default BackHome
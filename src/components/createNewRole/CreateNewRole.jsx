import "./CreateNewRole.css"
import React from 'react'
import BackHome from "../BackHome"
import { Button } from "@mui/material";
import { useEffect } from "react";
import { userRequest } from "../../requestMethod";
import { useState } from "react";

const CreateNewRole = () => {
    const [privileges,setPrivileges] = useState([]);
    useEffect(()=>{
        const fetchData = async()=>{
            const privilegeList =await userRequest.get("/privilege/all");
            setPrivileges(privilegeList?.data?.data);
        }
        fetchData();
    },[])

  return (
    <div className="createNewRole">
        <div className="createNewRoleContainer">
<BackHome/>
<h2>Create New Role</h2>
<div className="createRoleBox">
    <form className="createRoleBoxForm">
        <p>Name of Role</p>
        <input type="text" placeholder="enter role name" />
        <p style={{fontWeight:600}}>Choose Privileges</p>
        <div className="privilegesList">
        {privileges?.map(privilege=>(
            <div className="mapPrivilege">
            <input type="checkbox"/>
            <p>{privilege?.name}</p>
            </div>
        ))}
        </div>
<Button variant="contained">Submit</Button>
    </form>
</div>
        </div>
        </div>
  )
}

export default CreateNewRole
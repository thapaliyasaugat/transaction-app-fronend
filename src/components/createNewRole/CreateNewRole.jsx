import "./CreateNewRole.css"
import React from 'react'
import BackHome from "../BackHome"
import { Button } from "@mui/material";

const CreateNewRole = () => {
    const privileges = ["abcv","ddfdf","Fdfd","dsaacx"];
  return (
    <div className="createNewRole">
        <div className="createNewRoleContainer">
<BackHome/>
<h2>Create New Role</h2>
<div className="createRoleBox">
    <form className="createRoleBoxForm">
        <p>Name of Role</p>
        <input type="text" placeholder="enter role name" />
        <p>Choose Privileges</p>
        <div className="privilegesList">
        {privileges?.map(privilege=>(
            <div className="mapPrivilege">
            <input type="checkbox"/>
            <p>{privilege}</p>
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
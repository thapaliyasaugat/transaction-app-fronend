import { CheckBox } from '@mui/icons-material'
import { Button } from '@mui/material'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import React from 'react'
import "./CreateCashbackScheme.css"
import { useState } from 'react';
import { useRef } from 'react';
import {userRequest} from "../../requestMethod"
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const CreateCashbackScheme = () => {
    const subject = useRef();
    const description = useRef();
    const rewardRate = useRef();
    const [availabelRole , setAvailableRole] = useState([]);
    const [selectedRole , setSelectedRole] = useState([]);
    useEffect(()=>{
        const fetchData = async()=>{
            const roles = await userRequest.get("/admin/role/all");
            // console.log(roles);
            setAvailableRole(roles?.data?.data);
            console.log("available roles :: ", availabelRole)
        }
        fetchData();
    },[])
    const handleClick = (role)=>{
        if(selectedRole?.filter((r)=>(r.name==role.name)).length>0){
            let updatedRoles = selectedRole?.filter(r=>r.name!==role.name);
            setSelectedRole(updatedRoles);
        }else{
            let updatedRoles = [...selectedRole,role];
            setSelectedRole(updatedRoles);
        }
    }

    const cashbackCreate = async()=>{
        const data = {
            subject:subject.current.value,
            description:description.current.value,
            rewardRate:rewardRate.current.value,
            eligibleRoles:selectedRole
        };
        // console.log(data)
        try{
        const res = await userRequest.post("/cashback/create",data);
        console.log("response :: " + res)
        toast("Cashback Scheme Created Successfully.")
        subject.current.value = "";
        description.current.value = "";
        rewardRate.current.value="";
        }catch(err){
            console.log("Error :: ",err);
            toast("Error Submitting Cashback Scheme.")
            err?.response?.data?.subject && toast(err?.response?.data?.subject);
            err?.response?.data?.description && toast(err?.response?.data?.description);
            err?.response?.data?.rewardRate && toast(err?.response?.data?.rewardRate);
            err?.response?.data?.message && toast(err?.response?.data?.message);
            
        }
    }
  return (
    <div className='createcashback'>
        <div className="createcashbackcontainer">
            <h2>Create Cashback Scheme</h2>
            <form className='createcashbackform'>
                <div className="formtop">
                <div className="cashbackform">
                    Subject
                    <input type="text" ref={subject} placeholder='enter subject'/>
                </div>
                <div className="cashbackform">
                    Description
                    <textarea ref={description} placeholder='description....'></textarea>
                </div>
                <div className="cashbackform">
                    Rewared Rate
                    <input type="number" ref={rewardRate} placeholder='enter cashback rate'/>
                </div>
                </div>
                <div className="formbottom">
                    <div>
                    <h2>Choose Roles</h2>
                    <FormGroup>
                        {availabelRole?.map(role=>(
                            <FormControlLabel control={<Checkbox />} label={role?.name} onClick={()=>handleClick(role)} />
                        ))}
                </FormGroup>
                </div>
                    <div className="formsubmit">
                        <Button variant='contained' onClick={cashbackCreate}>Submit</Button>
                    </div>
                </div>
            </form>
        </div>
    </div>
  )
}

export default CreateCashbackScheme
import { useEffect, useState } from "react";
import { eventBusService } from "../services/createEventEmitter";
import { Button, Snackbar } from "@mui/material";



export function UserMsg(){
    const [msg, setMsg] = useState({txt:"login sucessfully", type:"email", color:""})

    useEffect(()=>{
        eventBusService.on("show-user-msg",(msg)=>{
            setMsg(msg)
            setTimeout(OncloseMsg, 3000)
        })
    },[])


    function OncloseMsg(){
        setMsg(null)
    }

    if(!msg) return <h1>loading</h1>
    return    ( 
    <Snackbar
    //   open={open}
      autoHideDuration={6000}
      onClose={OncloseMsg}
      message={msg.txt}
     />)

    // return<div className={"user-msg "+msg.type} style={{backgroundColor: msg.color}}>
    //     <p >{msg.txt}</p>
    //     <button onClick={OncloseMsg}>x</button>
    // </div>
}
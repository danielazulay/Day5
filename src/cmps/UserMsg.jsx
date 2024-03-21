import { useEffect, useState } from "react";
import { eventBusService } from "../services/createEventEmitter";



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

    if(!msg) return <></>
    return<div className={"user-msg "+msg.type} style={{backgroundColor: msg.color}}>
        <p >{msg.txt}</p>
        <button onClick={OncloseMsg}>x</button>
    </div>
}
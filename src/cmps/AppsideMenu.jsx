import { Link } from "react-router-dom";
import Button from "@mui/material-next/Button";
import CreateIcon from '@mui/icons-material/Create';
import InboxIcon from '@mui/icons-material/Inbox';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import SendIcon from '@mui/icons-material/Send';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useEffect } from "react";
import { mailService } from "../services/mail.service";

export function AppsideMenu({ openCompose, setFilter,contIsRead,setContIsRead }) {
  
  useEffect(()=>{
    setInitalValue()
  },[])

  async function setInitalValue(){
    let mails = await mailService.query({txt: ""});
    console.log("mails",mails)
    let count = 0
    mails.map((el)=>{
      if(el.isRead === false){
        count+=1
      }
    })
    console.log("mails"+count)
    setContIsRead((current)=>current+count)
  }

  return (
    <div className="side-menu">
      <Button color="activity" variant="filledTonal" onClick={openCompose}>
        <CreateIcon fontSize="small"></CreateIcon> Compose
      </Button>
      <div className="link-menu">
      <Link className="link-elements"
        to={"/mail/inbox"}
        onClick={() => {
          setFilter((oldfilter) => ({ ...oldfilter, status: "inbox" }));
        }}
      >
      <InboxIcon fontSize="small"></InboxIcon >  Inbox <span className="isread-count">{contIsRead}</span>
      </Link>
      <Link className="link-elements"
        to={"/mail/star"}
        onClick={() => {
          setFilter((oldfilter) => ({ ...oldfilter, status: "star" }));
        }}
      >
       <StarBorderIcon fontSize="small"> </StarBorderIcon>Starrred 
      </Link>
      <Link className="link-elements"
        to={"/mail/sent"}
        onClick={() => {
          setFilter((oldfilter) => ({ ...oldfilter, status: "sent" }));
        }}
      >
       <SendIcon fontSize="small"></SendIcon> Sent 
      </Link>
      <Link className="link-elements"
        to={"/mail/trash"}
        onClick={() => {
          setFilter((oldfilter) => ({ ...oldfilter, status: "trash" }));
        }}
      >
       <DeleteOutlineIcon fontSize="small"></DeleteOutlineIcon>  Trash
      </Link>
      </div>
    </div>
  );
}

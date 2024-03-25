import { Link } from "react-router-dom";
import Button from "@mui/material-next/Button";
import CreateIcon from '@mui/icons-material/Create';
import InboxIcon from '@mui/icons-material/Inbox';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import SendIcon from '@mui/icons-material/Send';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

export function AppsideMenu({ openCompose, setFilter,ContIsRead }) {
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
      <InboxIcon fontSize="small"></InboxIcon >  Inbox <h6>{ContIsRead}</h6>
      </Link>
      <Link className="link-elements"
        to={"/mail/star"}
        onClick={() => {
          setFilter((oldfilter) => ({ ...oldfilter, status: "star" }));
        }}
      >
       <StarBorderIcon fontSize="small"> </StarBorderIcon>Starrred <span>{}</span>
      </Link>
      <Link className="link-elements"
        to={"/mail/sent"}
        onClick={() => {
          setFilter((oldfilter) => ({ ...oldfilter, status: "sent" }));
        }}
      >
       <SendIcon fontSize="small"></SendIcon> Sent <span>{}</span>
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

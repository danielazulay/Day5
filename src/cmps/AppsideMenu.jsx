import { Link } from "react-router-dom";
import Button from "@mui/material-next/Button";
export function AppsideMenu({ openCompose, setFilter }) {

  return (


 <div className="side-menu">
  <Button color="activity" variant="filledTonal"  onClick={openCompose} >Compose</Button>
{/* <button onClick={openCompose} className="compose-button">Compose</button> */}
<Link to={"/mail/inbox"} onClick={() => { setFilter(oldfilter => ({ ...oldfilter, status: "inbox" })) }}>Inbox</Link>
<Link to={"/mail/star"} onClick={() => { setFilter(oldfilter => ({ ...oldfilter, status: "star" })) }}>Starrred</Link>
<Link to={"/mail/sent"} onClick={() => { setFilter(oldfilter => ({ ...oldfilter, status: "sent" })) }}>Sent</Link>
<Link to={"/mail/trash"} onClick={() => { setFilter(oldfilter => ({ ...oldfilter, status: "trash" })) }}>Trash</Link>
</div> 

  );
}

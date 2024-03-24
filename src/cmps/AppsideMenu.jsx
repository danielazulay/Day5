import { Link } from "react-router-dom";
import Button from "@mui/material-next/Button";
import CreateIcon from '@mui/icons-material/Create';

export function AppsideMenu({ openCompose, setFilter }) {
  return (
    <div className="side-menu">
      <Button color="activity" variant="filledTonal" onClick={openCompose}>
        <CreateIcon fontSize="small"></CreateIcon>Compose
      </Button>
      <Link
        to={"/mail/inbox"}
        onClick={() => {
          setFilter((oldfilter) => ({ ...oldfilter, status: "inbox" }));
        }}
      >
        Inbox
      </Link>
      <Link
        to={"/mail/star"}
        onClick={() => {
          setFilter((oldfilter) => ({ ...oldfilter, status: "star" }));
        }}
      >
        Starrred
      </Link>
      <Link
        to={"/mail/sent"}
        onClick={() => {
          setFilter((oldfilter) => ({ ...oldfilter, status: "sent" }));
        }}
      >
        Sent
      </Link>
      <Link
        to={"/mail/trash"}
        onClick={() => {
          setFilter((oldfilter) => ({ ...oldfilter, status: "trash" }));
        }}
      >
        Trash
      </Link>
    </div>
  );
}

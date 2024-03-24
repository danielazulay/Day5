import { useState } from "react";
import Button from "@mui/material-next/Button";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import SettingsIcon from "@mui/icons-material/Settings";
import AppsIcon from "@mui/icons-material/Apps";
import SearchBar from "./SearchBar";
import { Avatar } from "@mui/material";
import { loggedUser } from "../services/mail.service";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CircleIcon from '@mui/icons-material/Circle';

export function AppHeader({ filter, setFilter }) {
  const [filterBy, setFilterBy] = useState("");

  // function handleChange({ target }) {
  //   let { value, name: field } = target;
  //   console.log(target);
  //   setFilterBy(value);
  // }

  function handleChange({ target }) {
    let { value, name: field } = target;

    setFilter((oldfilter) => ({ ...oldfilter, txt: value })); //filterBy instead if using submit the problem if dont to use the filter is not enoth empy need to submit empty
  }

  return (
    <nav className="header-menu">
      <img src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x_r5.png" />
      <SearchBar className="filter-bar" filter={filter} setFilter={setFilter} />
      <aside className="gmail-option">
        <Button color="primary" size="large" variant="filledTonal">
         <CircleIcon fontSize="samll"></CircleIcon>  Active <KeyboardArrowDownIcon/>
        </Button>
        <HelpOutlineIcon color="action" />

        <SettingsIcon className="Outlined" />
        <AppsIcon></AppsIcon>
        <Avatar alt={loggedUser.name} src="/static/images/avatar" />
      </aside>
    </nav>
  );
}

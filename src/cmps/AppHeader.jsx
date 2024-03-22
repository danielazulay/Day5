import { useState } from "react";
import Button from "@mui/material-next/Button";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import SettingsIcon from "@mui/icons-material/Settings";
import AppsIcon from "@mui/icons-material/Apps";
import SearchBar from "./SearchBar";
import { Avatar } from "@mui/material";

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
      {/* <form>
        <button type submit>
          <svg
            className="lupa-img"
            focusable="false"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M20.49,19l-5.73-5.73C15.53,12.2,16,10.91,16,9.5C16,5.91,13.09,3,9.5,3S3,5.91,3,9.5C3,13.09,5.91,16,9.5,16 c1.41,0,2.7-0.47,3.77-1.24L19,20.49L20.49,19z M5,9.5C5,7.01,7.01,5,9.5,5S14,7.01,14,9.5S11.99,14,9.5,14S5,11.99,5,9.5z"></path>
            <path d="M0,0h24v24H0V0z" fill="none"></path>
          </svg>
        </button>
        <input
          type="text"
          placeholder="Search in mail"
          name="body"
          value={filter.txt}
          onChange={handleChange}
        ></input>
      </form> */}
      <aside className="gmail-option">
        <Button color="primary" size="large" variant="filledTonal">
          Active
        </Button>
        <HelpOutlineIcon color="action" />

        <SettingsIcon className="Outlined" />
        <AppsIcon></AppsIcon>
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
      </aside>
    </nav>
  );
}

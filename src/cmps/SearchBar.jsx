import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar({ filter, setFilter }) {
  function handleChange({ target }) {
    let { value, name: field } = target;

    setFilter((oldfilter) => ({ ...oldfilter, txt: value })); //filterBy instead if using submit the problem if dont to use the filter is not enoth empy need to submit empty
  }

  return (
    <Paper
      component="form"
      sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}
    >
      <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>

      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search Gmail"
        inputProps={{ "aria-label": "search gmail" }}
        type="text"
        name="body"
        value={filter.txt}
        onChange={handleChange}
      />
      <IconButton sx={{ p: "10px" }} aria-label="menu">
        <MenuIcon />
      </IconButton>
    </Paper>
  );
}

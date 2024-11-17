import React from "react";
import { Link}from "react-router-dom";
import "./Header.css";
import {
  Home,
  Add,
  GroupAddRounded,
  Chat,
  AccountCircle,
} from "@mui/icons-material";

export default function Header() {

  return (
    <div className="header ">
      {localStorage.getItem("token") ? (
        <>
          <Link to="/homePost">
            <Home />
          </Link>
          <Link to="/Chats">
            <Chat />
          </Link>
          <Link to="/AddPost">
            <Add />
          </Link>
          <Link to="/AddFriends">
            <GroupAddRounded />
          </Link>
          <Link to="/profile">
            <AccountCircle />
          </Link>
        </>
      ) : (
        <span />
      )}
    </div>
  );
}

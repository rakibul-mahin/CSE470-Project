import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import ChatIcon from "@mui/icons-material/Chat";
import "./navbar.css";
import { useDispatch, useSelector } from "react-redux";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { logout } from "../Redux/userReducer";
import { Link } from "react-router-dom";
const Navbar = () => {
  const userDetails = useSelector((state) => state.user);
  let user = userDetails.user;
  const { username, userimage } = user.user;
  const dispatch = useDispatch();
  const logoutHandler = (e) => {
    dispatch(logout());
  };
  return (
    <div className='main-navbar'>
      <div className='logo-container'>
        <Link to={`/`}>
          <h3 style={{ textDecoration: "None" }}>GameVerse</h3>
        </Link>
      </div>
      <div>
        <div className='search-input-container'>
          <SearchIcon className='search-icon' />
          <input type='text' placeholder='Search...' className='search-input' />
        </div>
      </div>
      <div className='icon-container'>
        <PowerSettingsNewIcon
          className='icons p-icon'
          onClick={logoutHandler}
        />
        <ChatIcon className='icons' />
        <Link to={`/profile/${user.user._id}`}>
          <div className='info-container'>
            <img
              src={`${userimage}`}
              alt='profileimage'
              className='profile-image'
            />
            <p className='profile-name'>{username}</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;

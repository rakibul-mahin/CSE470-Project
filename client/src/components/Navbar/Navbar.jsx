import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ChatIcon from "@mui/icons-material/Chat";
import "./navbar.css";
import { useDispatch, useSelector } from "react-redux";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { logout } from "../Redux/userReducer";
import { Link } from "react-router-dom";
import axios from "axios";
const Navbar = () => {
  const userDetails = useSelector((state) => state.user);
  let user = userDetails.user;
  const { username } = user.user;
  const dispatch = useDispatch();
  const logoutHandler = (e) => {
    dispatch(logout());
  };
  const [cUser, setCUser] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/get/user-details/${user.user._id}`
        );
        setCUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, []);

  const handleSearch = async () => {
    setSearching(true);
    try {
      const res = await axios.get(
        `http://localhost:5000/api/search/users?q=${searchQuery}`,
        {
          headers: { token: user.accessToken },
        }
      );
      setSearchResults(res.data);
      setSearching(false);
    } catch (err) {
      console.log(err);
      setSearching(false);
    }
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
          <input
            type='text'
            placeholder='Search...'
            className='search-input'
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
        </div>
        {searching && <p>Searching...</p>}
        {searchResults.length > 0 && (
          <div className='search-results-container'>
            {searchResults.map((result) => (
              <Link to={`/profile/${result._id}`}>
                <div key={result._id} className='search-result'>
                  <img
                    src={`${result.userimage}`}
                    alt='profileimage'
                    className='profile-image'
                  />
                  <p className='profile-name'>{result.username}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
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
              src={`${cUser.userimage}`}
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

import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ChatIcon from "@mui/icons-material/Chat";
import "./navbar.css";
import { useDispatch, useSelector } from "react-redux";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import GamepadIcon from "@mui/icons-material/Gamepad";
import PersonIcon from "@mui/icons-material/Person";
import ClearIcon from "@mui/icons-material/Clear";
import { logout } from "../Redux/userReducer";
import { Link } from "react-router-dom";
import axios from "axios";
const Navbar = () => {
  const [clear, setClear] = useState(true);
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
      setClear(false);
      setSearchResults(res.data);
      setSearching(false);
    } catch (err) {
      console.log(err);
      setSearching(false);
    }
  };

  const handleSearchClear = () => {
    setClear(true);
    setSearchResults([]);
  };
  return (
    <div className='navbar bg-base-100'>
      <div className='flex-1'>
        <Link to={`/`}>
          <span className='flex flex-row gap-4 items-center'>
            <GamepadIcon
              className='text-logo-img-yellow ml-7'
              style={{ transform: "scale(2)" }}
            />
            <h3 className='text-logo-text-green text-4xl'>GameVerse</h3>
          </span>
        </Link>
      </div>
      <div>
        <div className='relative w-full max-w-xs'>
          {clear === true ? (
            <SearchIcon
              style={{
                cursor: "pointer",
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
              }}
              onClick={handleSearch}
            />
          ) : (
            <ClearIcon
              style={{
                cursor: "pointer",
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
              }}
              onClick={handleSearchClear}
            />
          )}

          <input
            type='text'
            placeholder='Search...'
            onChange={(e) => setSearchQuery(e.target.value)}
            className='input input-bordered w-full'
          />
        </div>
        {searching && <p>Searching...</p>}
        {searchResults.length > 0 && (
          <div className='dropdown dropdown-end p-3 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52 absolute top-20 z-10'>
            {searchResults.map((result) => (
              <Link to={`/profile/${result._id}`}>
                <div
                  key={result._id}
                  className='flex flex-row btn-ghost btn-circle avatar items-center'
                >
                  <img
                    src={`${result.userimage}`}
                    alt='profileimage'
                    className='w-10 rounded-full'
                  />
                  <p className='text-logo-text-green ml-3'>{result.username}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      <div className='dropdown dropdown-end'>
        <label tabIndex={0} className='btn btn-ghost btn-circle avatar'>
          <div className='w-10 rounded-full'>
            <img src={`${cUser.userimage}`} alt='loggedinprofileimage' />
          </div>
        </label>
        <ul
          tabIndex={0}
          className='mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52'
        >
          <li>
            <Link to={`/profile/${user.user._id}`}>
              <span className='flex flex-row gap-3 justify-center items-center'>
                <PersonIcon /> Profile
              </span>
            </Link>
          </li>
          <li>
            <Link to={`/chat`}>
              <span className='flex flex-row gap-3 justify-center items-center'>
                <ChatIcon /> Chat
              </span>
            </Link>
          </li>
          <li>
            <span
              className='flex flex-row gap-3 justify-center items-center'
              onClick={logoutHandler}
            >
              <PowerSettingsNewIcon /> Logout
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;

import React, { useEffect, useState } from "react";
import "./profileLeftSide.css";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import FaceIcon from "@mui/icons-material/Face";
import LandscapeIcon from "@mui/icons-material/Landscape";
import MenuBookIcon from '@mui/icons-material/MenuBook';
import BusinessIcon from '@mui/icons-material/Business';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';

const ProfileLeftSide = () => {
  const navigate = useNavigate();
  let location = useLocation();
  let uid = location.pathname.split("/")[2];
  const [followers, setFollowers] = useState([]);
  const userDetails = useSelector((state) => state.user);
  let users = userDetails.user;

  useEffect(() => {
    const getFollower = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/all/follower/${uid}`
        );
        setFollowers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFollower();
  }, []);

  const [user, setuser] = useState([]);
  useEffect(() => {
    const getuser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/get/user-details/${uid}`
        );
        setuser(res.data);
      } catch (error) {
        console.log("Some error occured");
      }
    };
    getuser();
  }, []);

  let followersCounter = user?.followers?.length;
  let followingCounter = user?.following?.length;

  const handleClick = async (id) => {
    const res = await axios.get(
      `http://localhost:5000/api/get/user-details/${uid}`
    );
    setuser(res.data);
    window.location.reload(); // Reloads the current page
  };

  const handleEditProfile = (uid) => {
    if (location.search || location.hash) {
      navigate(location.pathname, { replace: true });
    }
    navigate(`/update/profile/${uid}`);
  };

  const changeProPicHandler = (e) => {
    e.preventDefault();
    navigate(`/update/profile/pic/${users.user._id}`);
  };

  const changeCoverPicHandler = (e) => {
    e.preventDefault();
    navigate(`/update/cover/pic/${users.user._id}`);
  };

  return (
    <div className='flex flex-col gap-2'>
      {/* <div className='container-one'>
        <img
          src={`${user.coverimage}`}
          alt='profcover'
          className='profile-page-cover'
        />
        {users.user._id === uid ? (
          <LandscapeIcon
            style={{ color: "white" }}
            onClick={changeCoverPicHandler}
          />
        ) : (
          ""
        )}
        <div style={{ display: "flex", alignItems: "center", marginTop: -40 }}>
          <img
            src={`${user.userimage}`}
            alt='profimage'
            className='profile-page-image'
          />
          {users.user._id === uid ? (
            <FaceIcon
              style={{ color: "white" }}
              onClick={changeProPicHandler}
            />
          ) : (
            ""
          )}
          <div>
            <p
              style={{
                marginLeft: 7,
                marginTop: 35,
                color: "white",
                textAlign: "start",
              }}
            >
              {user.firstname} {user.lastname}
            </p>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p style={{ color: "white", marginLeft: 20 }}>Bio</p>
          <p
            style={{
              color: "white",
              marginRight: 50,
              fontSize: "10px",
              marginTop: "20px",
            }}
          >
            {user.bio}
          </p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: -30,
          }}
        >
          <p style={{ color: "white", marginLeft: 20 }}>Followers</p>
          <p
            style={{
              color: "white",
              marginRight: 50,
              fontSize: "10px",
              marginTop: "25px",
            }}
          >
            {followersCounter}
          </p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: -30,
          }}
        >
          <p style={{ color: "white", marginLeft: 20 }}>Following</p>
          <p
            style={{
              color: "white",
              marginRight: 50,
              fontSize: "10px",
              marginTop: "25px",
            }}
          >
            {followingCounter}
          </p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: -30,
          }}
        >
          <p style={{ color: "white", marginLeft: 20 }}>Discord</p>
          <p
            style={{
              color: "white",
              marginRight: 50,
              fontSize: "10px",
              marginTop: "25px",
            }}
          >
            {user.gameprofile}
          </p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: -30,
          }}
        >
          <p style={{ color: "white", marginLeft: 20 }}>Address</p>
          <p
            style={{
              color: "white",
              marginRight: 50,
              fontSize: "10px",
              marginTop: "25px",
            }}
          >
            {user.address}
          </p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: -30,
          }}
        >
          <p style={{ color: "white", marginLeft: 20 }}>Email</p>
          <p
            style={{
              color: "white",
              marginRight: 50,
              fontSize: "10px",
              marginTop: "25px",
            }}
          >
            {user.email}
          </p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: -30,
          }}
        >
          <p style={{ color: "white", marginLeft: 20 }}>Phone</p>
          <p
            style={{
              color: "white",
              marginRight: 50,
              fontSize: "10px",
              marginTop: "25px",
            }}
          >
            {user.mobile}
          </p>
        </div>
        {users.user._id === uid ? (
          <button
            style={{
              width: "90px",
              marginLeft: "90px",
              marginBottom: "10px",
              padding: "3px",
              borderRadius: "15px",
              border: "None",
              backgroundColor: "green",
              color: "white",
              cursor: "pointer",
            }}
            onClick={() => handleEditProfile(user._id)}
          >
            Edit
          </button>
        ) : (
          ""
        )}
      </div> */}
      <div className='mt-3 ml-7 flex flex-col gap-3 card bg-slate-900 justify-center items-center p-3 overflow-y-scroll'>
        <div>
          <img
            src={`${user.coverimage}`}
            alt='profcover'
            className='relative'
          />
          <div
            className='avatar absolute'
            style={{ top: "220px", left: "70px" }}
          >
            <div className='w-28 rounded-full'>
              <img src={`${user.userimage}`} alt='profimage' />
            </div>
          </div>
        </div>
        <div>
          {users.user._id === uid ? (
            <div className='ml-9 flex flex-row gap-5 justify-center items-center'>
              <LandscapeIcon
                style={{ color: "white" }}
                onClick={changeCoverPicHandler}
              />
              <FaceIcon
                style={{ color: "white" }}
                onClick={changeProPicHandler}
              />
            </div>
          ) : (
            ""
          )}
        </div>
        <div>
          <h3 className='text-logo-text-green text-2xl mt-5'>
            {user.firstname} {user.lastname}
          </h3>
        </div>
        <div className="flex flex-row gap-3">
          <div>
            <h3><span className="text-logo-text-green">Followers:</span> {followersCounter}</h3>
          </div>
          <div>
            <h3><span className="text-logo-text-green">Following:</span> {followingCounter}</h3>
          </div>
        </div>
        <div className="flex flex-col gap-2 justify-start items-center">
          <h3 className="text-logo-text-green flex flex-row gap-2 justify-center items-center">
            <span><MenuBookIcon /></span>
            <span>Bio</span>
          </h3>
          <p>{user.bio}</p>
        </div>
        <div className="flex flex-col gap-2 justify-start items-center">
          <h3 className="text-logo-text-green flex flex-row gap-2 justify-center items-center">
            <span><BusinessIcon /></span>
            <span>Address</span>
          </h3>
          <p>{user.address}</p>
        </div>
        <div className="flex flex-col gap-2 justify-start items-center">
          <h3 className="text-logo-text-green flex flex-row gap-2 justify-center items-center">
            <span><AlternateEmailIcon /></span>
            <span>Email</span>
          </h3>
          <p>{user.email}</p>
        </div>
        <div className="flex flex-col gap-2 justify-start items-center">
          <h3 className="text-logo-text-green flex flex-row gap-2 justify-center items-center">
            <span><PhoneAndroidIcon /></span>
            <span>Mobile</span>
          </h3>
          <p>{user.mobile}</p>
        </div>
        <div className="flex flex-col gap-2 justify-start items-center">
          <h3 className="text-logo-text-green flex flex-row gap-2 justify-center items-center">
            <span><SportsEsportsIcon /></span>
            <span>Discord</span>
          </h3>
          <p>{user.gameprofile}</p>
        </div>
        {users.user._id === uid ? (
          <button
            className='rounded-full p-2 w-24 my-4 bg-logo-text-green text-zinc-950'
            onClick={() => handleEditProfile(user._id)}
          >
            Edit
          </button>
        ) : (
          ""
        )}
      </div>

      <div className='mt-3 ml-7 flex flex-col gap-3 card bg-slate-900 justify-center items-center p-3'>
        <h3 className='text-logo-text-green'>Followers</h3>
        <div className='flex flex-col gap-2 p-3 justify-center items-center'>
          {followers.map((item) => (
            <div className='flex flex-row gap-2 justify-center items-center'>
              <img
                src={`${item.userimage}`}
                alt='followimg'
                className='follower-img'
              />
              <p style={{ color: "white", marginLeft: "10px" }}>
                {item.username}
              </p>
              <Link to={`/profile/${item._id}`}>
                <button
                  onClick={() => handleClick(item._id)}
                  className='rounded-full p-2 w-28 my-4 bg-logo-text-green text-zinc-950'
                >
                  View Profile
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileLeftSide;

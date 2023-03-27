import React, { useEffect, useState } from "react";
import "./profileLeftSide.css";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import FaceIcon from "@mui/icons-material/Face";

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

  return (
    <div className='left-side'>
      <div className='container-one'>
        <img
          src={`${user.coverimage}`}
          alt='profcover'
          className='profile-page-cover'
        />
        <div style={{ display: "flex", alignItems: "center", marginTop: -40 }}>
          <img
            src={`${user.userimage}`}
            alt='profimage'
            className='profile-page-image'
          />
          <FaceIcon style={{ color: "white" }} onClick={changeProPicHandler} />
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
      </div>

      <div className='container-one'>
        <h3 style={{ color: "white" }}>Followers</h3>
        <div>
          {followers.map((item) => (
            <div
              style={{
                display: "flex",
                marginLeft: "20px",
                marginTop: "5px",
              }}
              key={item._id}
            >
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
                  style={{
                    width: "100px",
                    marginLeft: "50px",
                    marginRight: "8px",
                    marginBottom: "10px",
                    padding: "3px",
                    borderRadius: "15px",
                    border: "None",
                    backgroundColor: "green",
                    color: "white",
                    cursor: "pointer",
                  }}
                  onClick={() => handleClick(item._id)}
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

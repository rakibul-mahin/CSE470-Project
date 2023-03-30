import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const Follow = ({ userdetails }) => {
  const userDetails = useSelector((state) => state.user);
  let loguser = userDetails.user;
  const accesstoken = loguser.accessToken;
  const [follow, setFollow] = useState(false);
  let done = false;
  const handleFollow = async (e) => {
    try {
      await axios.put(
        `http://localhost:5000/api/follow/${userdetails._id}`,
        {
          user: loguser.user._id,
        },
        {
          headers: {
            token: accesstoken,
          },
        }
      );
      setFollow(!follow);
      done = true;
      if (done === true) {
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className='one-user-container' key={userdetails._id}>
      <div className='one-user'>
        <img
          src={`${userdetails.userimage}`}
          alt='sm-user-profile'
          className='sm-follow-img'
        />
        <p style={{ marginLeft: "10px" }}>{userdetails.username}</p>
      </div>
      <div>
        <button
          className={follow ? "unfollow-btn" : "follow-btn"}
          onClick={(e) => handleFollow(userdetails._id)}
        >
          {follow ? "Following" : "Follow"}
        </button>
      </div>
    </div>
  );
};

export default Follow;

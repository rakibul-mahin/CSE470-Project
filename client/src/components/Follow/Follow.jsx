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
    <div className='flex flex-row gap-2 justify-center items-center'>
      <div className='flex flex-row gap-2 justify-center items-center'>
        <div className='avatar'>
          <div className='w-14 rounded-full'>
            <img
              src={`${userdetails.userimage}`}
              alt='sm-user-profile'
              className=''
            />
          </div>
        </div>
        <p>{userdetails.username}</p>
      </div>
      <div>
        <button
          onClick={(e) => handleFollow(userdetails._id)}
          className='rounded-full p-2 w-24 my-4 bg-logo-text-green text-zinc-950 hover:bg-lime-300'
        >
          {follow ? "Following" : "Follow"}
        </button>
      </div>
    </div>
  );
};

export default Follow;

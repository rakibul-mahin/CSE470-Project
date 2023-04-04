import React, { useEffect, useState } from "react";
import "./profileRightSide.css";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";

const ProfileRightSide = () => {
  const navigate = useNavigate();
  let location = useLocation();
  let uid = location.pathname.split("/")[2];
  const [followings, setFollowings] = useState([]);
  const userDetails = useSelector((state) => state.user);
  let users = userDetails.user;
  console.log(users);

  const handleClick = async (uid) => {
    navigate(`/profile/${uid}`);
    window.location.reload(); // Reloads the current page
  };

  useEffect(() => {
    const getFollowings = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/all/following/${uid}`
        );
        setFollowings(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFollowings();
  }, []);
  return (
    <div>
      <div className='flex flex-col gap-2 card bg-slate-900 justify-center items-center p-3 mr-2'>
        <h3 className='text-logo-text-green'>Following</h3>
        <div className='flex flex-col gap-2'>
          {followings.map((item) => (
            <div className='flex flex-row gap-2 justify-center items-center'>
              <div className='avatar'>
                <div className='w-14 rounded-full'>
                  <img src={`${item.userimage}`} alt='followimg' />
                </div>
              </div>
              <p>{item.username}</p>
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

export default ProfileRightSide;

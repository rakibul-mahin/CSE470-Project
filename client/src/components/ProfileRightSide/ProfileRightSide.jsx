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
    <div className='right-side'>
      <div className='container-one'>
        <h3 style={{ color: "white" }}>Following</h3>
        <div>
          {followings.map((item) => (
            <div
              style={{ display: "flex", marginLeft: "20px", marginTop: "5px" }}
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

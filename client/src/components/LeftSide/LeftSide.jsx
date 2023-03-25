import React, { useEffect, useState } from "react";
import "./leftSide.css";
import { useSelector } from "react-redux";
import axios from "axios";

const LeftSide = () => {
  const userDetails = useSelector((state) => state.user);
  let user = userDetails.user;
  let id = user.user._id;
  const accesstoken = user.accessToken;
  const [post, setPost] = useState([]);
  const [notifications, setNotification] = useState([]);
  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/followers-post/${id}`,
          {
            headers: {
              token: accesstoken,
            },
          }
        );
        setPost(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPost();
  }, []);

  useEffect(() => {
    const getNotification = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/notifications/${id}`,
          {
            headers: {
              token: accesstoken,
            },
          }
        );
        // console.log(res, 2);
        setNotification(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getNotification();
  }, []);
  // console.log(notifications, 1);
  return (
    <div className='left-side'>
      <div className='container-one'>
        <div className='left-content'>
          <p style={{ color: "white" }}>Notifications</p>
        </div>
        {notifications.map((item) => (
          <div className='left-user-detail'>
            <img src={`${item.userimage}`} alt='profimg' className='left-img' />
            <p
              style={{
                marginLeft: "10px",
                fontSize: 13,
                textAlign: "start",
                width: "120px",
                color: "white",
              }}
            >
              {item.username} {item.type}
            </p>
            <img
              src={`${item.postimg}`}
              alt='profimg'
              className={
                item.type === "started following you"
                  ? "follow-img"
                  : "like-img"
              }
            />
          </div>
        ))}
      </div>

      <div className='container-one'>
        <div className='left-content'>
          <p style={{ color: "white" }}>Explore</p>
        </div>
        <div>
          {post.map((item) =>
            item.map((image) => (
              <img
                src={`${image.image}`}
                alt='postimg'
                className='explore-img'
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default LeftSide;

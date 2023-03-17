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
  return (
    <div className='left-side'>
      <div className='container-one'>
        <div className='left-content'>
          <p>Notifications</p>
          <p style={{ color: "#aaa" }}>See all</p>
        </div>
        <div className='left-user-detail'>
          <img
            src='https://images.unsplash.com/photo-1637858868799-7f26a0640eb6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGNhcnRvb258ZW58MHx8MHx8&auto=format&fit=crop&w=400&q=60'
            alt='profimg'
            className='left-img'
          />
          <p
            style={{
              marginLeft: "10px",
              fontSize: 13,
              textAlign: "start",
              width: "120px",
            }}
          >
            Test Likes your Post
          </p>
          <img
            src='https://images.unsplash.com/photo-1637858868799-7f26a0640eb6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGNhcnRvb258ZW58MHx8MHx8&auto=format&fit=crop&w=400&q=60'
            alt='profimg'
            className='like-img'
          />
        </div>
        <div className='left-user-detail'>
          <img
            src='https://images.unsplash.com/photo-1637858868799-7f26a0640eb6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGNhcnRvb258ZW58MHx8MHx8&auto=format&fit=crop&w=400&q=60'
            alt='profimg'
            className='left-img'
          />
          <p
            style={{
              marginLeft: "10px",
              fontSize: 13,
              textAlign: "start",
              width: "120px",
            }}
          >
            Test started following you
          </p>
          <img
            src='https://images.unsplash.com/photo-1637858868799-7f26a0640eb6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGNhcnRvb258ZW58MHx8MHx8&auto=format&fit=crop&w=400&q=60'
            alt='profimg'
            className='follow-img'
          />
        </div>
        <div className='left-user-detail'>
          <img
            src='https://images.unsplash.com/photo-1637858868799-7f26a0640eb6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGNhcnRvb258ZW58MHx8MHx8&auto=format&fit=crop&w=400&q=60'
            alt='profimg'
            className='left-img'
          />
          <p
            style={{
              marginLeft: "10px",
              fontSize: 13,
              textAlign: "start",
              width: "120px",
            }}
          >
            Test commented on your post
          </p>
          <img
            src='https://images.unsplash.com/photo-1637858868799-7f26a0640eb6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGNhcnRvb258ZW58MHx8MHx8&auto=format&fit=crop&w=400&q=60'
            alt='profimg'
            className='like-img'
          />
        </div>
      </div>

      <div className='container-one'>
        <div className='left-content'>
          <p>Explore</p>
          <p style={{ color: "#aaa" }}>See all</p>
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

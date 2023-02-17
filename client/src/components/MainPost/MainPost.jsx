import React, { useEffect, useState } from "react";
import "./mainPost.css";
import ContentPost from "../ContentPost/ContentPost";
import Post from "../Post/Post";
import axios from "axios";
import { useSelector } from "react-redux";

const MainPost = () => {
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
    <div className='main-post'>
      <ContentPost />
      {post.map((item) =>
        item.map((postDetails) => (
          <Post post={postDetails} key={postDetails._id} />
        ))
      )}
    </div>
  );
};

export default MainPost;

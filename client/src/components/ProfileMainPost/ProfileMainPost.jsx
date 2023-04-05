import React, { useEffect, useState } from "react";
import "./profileMainPost.css";
import ContentPost from "../../components/ContentPost/ContentPost";
import ProfilePost from "../ProfilePost/ProfilePost";
import axios from "axios";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const ProfileMainPost = () => {
  const userDetails = useSelector((state) => state.user);
  let users = userDetails.user;
  const accesstoken = users.accessToken;
  const [post, setPost] = useState([]);
  let location = useLocation();
  let id = location.pathname.split("/")[2];
  const [user, setUser] = useState([]);
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/get/user-details/${id}`
        );
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, []);
  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/get/post/${id}`);
        setPost(res.data.mypost);
      } catch (err) {
        console.log(err);
      }
    };
    getPost();
  }, []);
  return (
    <div className=''>
      <div>
        <img
          src={`${user.coverimage}`}
          alt='coverimg'
          className=''
        />
      </div>
      {users.user._id === id ? <ContentPost /> : ""}

      {post.map((item) => (
        <ProfilePost details={item} key={item._id} />
      ))}
    </div>
  );
};

export default ProfileMainPost;

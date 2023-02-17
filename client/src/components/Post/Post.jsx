import React, { useEffect, useState } from "react";
import "./post.css";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import ForumIcon from "@mui/icons-material/Forum";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import axios from "axios";
const Post = ({ post }) => {
  const [heat, setHeat] = useState(false);
  const [user, setUser] = useState([]);
  const handelHeat = () => {
    setHeat(!heat);
  };
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/get/user-details/${post.user}`
        );
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, []);

  const shareOnTwitter = () => {
    const text = `${post.desc} | ${post.image}`; // text to be included in the tweet
    const url = "http://localhost:3000/"; // URL to be included in the tweet
    const imageUrl =
      "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"; // URL of the image to be shared
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      text
    )}&url=${encodeURIComponent(url)}&data-url=${encodeURIComponent(imageUrl)}`;

    window.open(tweetUrl);
  };

  return (
    <div className='post-container'>
      <div className='sub-post-container'>
        <div>
          <div className='user-details'>
            <img
              src={`${user.userimage}`}
              alt='profileimg'
              className='profile-img'
            />
            <p className='username'>{user.username}</p>
            <MoreVertIcon className='more-vert-icon' />
          </div>
          <p className='post-text'>{post.desc}</p>
          <img src={`${post.image}`} alt='userupimg' className='post-image' />
          <div>
            <div className='reactions'>
              <div style={{ display: "flex", alignItems: "center" }}>
                <LocalFireDepartmentIcon
                  className={
                    heat ? "reaction-icon reaction-icon-heat" : "reaction-icon"
                  }
                  onClick={handelHeat}
                />
                <p>10 Hits</p>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <ForumIcon className='reaction-icon' />
                <p>5 Comments</p>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <ShareIcon className='reaction-icon' onClick={shareOnTwitter} />
                <p>Share</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;

import React, { useEffect, useState } from "react";
import "./profilePost.css";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import ForumIcon from "@mui/icons-material/Forum";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ForwardIcon from "@mui/icons-material/Forward";
import axios from "axios";
import { useSelector } from "react-redux";

const ProfilePost = ({ details }) => {
  const userDetails = useSelector((state) => state.user);
  let users = userDetails.user;
  const accesstoken = users.accessToken;
  const [heat, setHeat] = useState(
    details.like.includes(users.user._id) ? true : false
  );

  const [count, setCount] = useState(details.like.length);
  const [comment, setComment] = useState(details.comments);
  const [commentWriting, setCommentWriting] = useState("");
  const [showComment, setShowComment] = useState(false);

  const [user, setUser] = useState([]);

  const addComment = async () => {
    try {
      const fake_comment = {
        postid: `${details._id}`,
        username: `${users.user.username}`,
        userimage: `${users.user.userimage}`,
        comment: `${commentWriting}`,
      };
      await axios.put(`http://localhost:5000/api/post/comment`, fake_comment, {
        headers: {
          token: accesstoken,
        },
      });
      setComment(comment.concat(fake_comment));
    } catch (err) {
      console.log(err);
    }
  };

  const handelHeat = async () => {
    try {
      if (heat === true) {
        await axios.put(
          `http://localhost:5000/api/like/${details._id}`,
          { uid: users.user._id },
          {
            headers: {
              token: accesstoken,
            },
          }
        );
        setHeat(false);
        setCount(count - 1);
      } else {
        await axios.put(
          `http://localhost:5000/api/like/${details._id}`,
          { uid: users.user._id },
          {
            headers: {
              token: accesstoken,
            },
          }
        );
        setHeat(true);
        setCount(count + 1);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/get/user-details/${details.user}`
        );
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, []);

  const shareOnTwitter = () => {
    const text = `${details.desc} | ${details.image}`; // text to be included in the tweet
    const url = "http://localhost:3000/"; // URL to be included in the tweet
    const imageUrl =
      "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"; // URL of the image to be shared
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      text
    )}&url=${encodeURIComponent(url)}&data-url=${encodeURIComponent(imageUrl)}`;

    window.open(tweetUrl);
  };

  const handleComment = () => {
    addComment();
  };

  const handleCommentClick = () => {
    setShowComment(!showComment);
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
          <p className='post-text'>{details.desc}</p>
          <img
            src={`${details.image}`}
            alt='userupimg'
            className='post-image'
          />
          <div>
            <div className='reactions'>
              <div style={{ display: "flex", alignItems: "center" }}>
                <LocalFireDepartmentIcon
                  className={
                    heat ? "reaction-icon reaction-icon-heat" : "reaction-icon"
                  }
                  onClick={handelHeat}
                />
                <p>{count} Heats</p>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <ForumIcon
                  className='reaction-icon'
                  onClick={handleCommentClick}
                />
                <p>{comment.length} Comments</p>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <ShareIcon className='reaction-icon' onClick={shareOnTwitter} />
                <p>Share</p>
              </div>
            </div>
            {showComment === true ? (
              <div>
                <div className='first-comment'>
                  <img
                    src={`${users.user.userimage}`}
                    alt='profileimg'
                    className='profile-img'
                  />
                  <p className='log-in-username'>{users.user.username}</p>
                  <input
                    type='text'
                    className='log-in-write-comment'
                    placeholder='Write Comment...'
                    onChange={(e) => {
                      setCommentWriting(e.target.value);
                    }}
                  />
                  <ForwardIcon
                    className='add-comment-btn'
                    onClick={handleComment}
                  />
                </div>
                {comment.map((items) => (
                  <div className='all-comments' key={items._id}>
                    <img
                      src={`${items.userimage}`}
                      alt='profileimg'
                      className='profile-img'
                    />
                    <p className='comment-username'>{items.username}</p>
                    <p className='user-comments'>{items.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePost;

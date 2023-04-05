import React, { useEffect, useState } from "react";
import "./profilePost.css";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import ForumIcon from "@mui/icons-material/Forum";
import ShareIcon from "@mui/icons-material/Share";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ForwardIcon from "@mui/icons-material/Forward";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

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
    <div>
      <div>
        <div className='flex flex-col card gap-3 bg-slate-900 w-auto mt-7 p-5 shadow-xl'>
          <div className='flex flex-row gap-3 items-center justify-center'>
            <div className='avatar'>
              <div className='w-20 rounded-full'>
                <img src={`${user.userimage}`} alt='profileimg' />
              </div>
            </div>

            <p className='text-logo-text-green text-2xl'>{user.username}</p>
            {users.user._id === user._id ? (
              <span className='flex flex-row gap-3'>
                <Link to={`/edit/post/${details._id}`}>
                  <EditIcon className='text-slate-50 hover:text-slate-400 ' />
                </Link>
                <Link to={`/delete/post/${details._id}`}>
                  <DeleteForeverIcon className='text-slate-50 hover:text-slate-400 ' />
                </Link>
              </span>
            ) : null}
          </div>
          <div className='card-body'>
            <div className='card-title mb-3'>
              <p className='text-logo-text-green'>{details.desc}</p>
            </div>
            <img
              src={`${details.image}`}
              alt='userupimg'
              className='rounded-xl'
            />
          </div>
          <div>
            <div className='flex flex-row gap-6 justify-center items-center card-actions'>
              <div>
                <span className='flex flex-row gap-3'>
                  <LocalFireDepartmentIcon
                    onClick={handelHeat}
                    className={
                      heat === false
                        ? `text-slate-50 hover:text-slate-400`
                        : `text-rose-500 hover:text-rose-400`
                    }
                  />
                  <p className='text-logo-text-green'>{count} Heats</p>
                </span>
              </div>
              <div>
                <span className='flex flex-row gap-3'>
                  <ForumIcon
                    onClick={handleCommentClick}
                    className='text-slate-50 hover:text-slate-400 '
                  />
                  <p className='text-logo-text-green'>
                    {comment.length} Comments
                  </p>
                </span>
              </div>
              <div>
                <span className='flex flex-row gap-3'>
                  <ShareIcon
                    onClick={shareOnTwitter}
                    className='text-slate-50 hover:text-slate-400 '
                  />
                  <p className='text-logo-text-green'>Share</p>
                </span>
              </div>
            </div>
            {showComment === true ? (
              <div>
                <div className='mt-4 flex flex-row gap-3 justify-center items-center'>
                  <img
                    src={`${users.user.userimage}`}
                    alt='profileimg'
                    className='w-14 rounded-full'
                  />
                  <p className='text-logo-text-green'>{users.user.username}</p>
                  <input
                    type='text'
                    placeholder='Write Comment...'
                    onChange={(e) => {
                      setCommentWriting(e.target.value);
                    }}
                    className='input input-bordered input-success w-full max-w-xs'
                  />
                  <ForwardIcon onClick={handleComment} />
                </div>
                {comment.map((items) => (
                  <div
                    key={items._id}
                    className='flex flex-row items-center gap-3 mt-3'
                  >
                    <img
                      src={`${items.userimage}`}
                      alt='profileimg'
                      className='profile-img'
                    />
                    <p className='text-logo-text-green'>{items.username}</p>
                    <p className='text-slate-200'>{items.comment}</p>
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

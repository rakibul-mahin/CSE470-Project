import React, { useEffect, useState } from "react";
import "./leftSide.css";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
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
          `http://localhost:5000/api/all/followers-post/${id}`,
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
  const deleteNotificationHandler = async (nid) => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/delete/notifications/${id}/${nid}`
      );
      console.log("Notification Deleted");
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className='mt-4 flex flex-col gap-7'>
      <div className='ml-7 flex flex-col gap-3 card bg-slate-900 justify-center items-center p-3 w-2/3 overflow-y-scroll'>
        <div>
          <p className='text-logo-text-green'>Others Activity</p>
        </div>
        {notifications.map((item) => (
          <div
            key={item._id}
            className='flex gap-4 justify-center items-center'
          >
            <div className='avatar'>
              <div className='w-14 rounded-full'>
                <img
                  src={`${item.userimage}`}
                  alt='profimg'
                  className='rounded-full'
                />
              </div>
            </div>
            <p className='text-rose-500'>
              {item.username} {item.type}
            </p>

            <img
              src={`${item.postimg}`}
              alt='activityimage'
              className={
                item.type === "started following you"
                  ? "w-14 rounded-full"
                  : "w-14 mask mask-hexagon"
              }
            />
            <DeleteForeverIcon
              className='text-slate-50 hover:text-slate-400'
              onClick={() => deleteNotificationHandler(item.notificationID)}
            />
          </div>
        ))}
      </div>

      <div className='ml-7 flex flex-col gap-3 card bg-slate-900 justify-center items-center p-3 w-2/3'>
        <div className='text-logo-text-green'>
          <p>Explore</p>
        </div>
        <div className='h-96 carousel carousel-vertical rounded-box'>
          {post.map((item) =>
            item.map((image) => (
              <div className='carousel-item h-full'>
                <img src={`${image.image}`} alt='postimg' key={item._id} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default LeftSide;

import axios from "axios";
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const DeletePost = () => {
  const navigate = useNavigate();
  let location = useLocation();
  const userDetails = useSelector((state) => state.user);
  let users = userDetails.user;
  let pid = location.pathname.split("/")[3];

  const handleYes = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/delete/post/${pid}`,
        {
          headers: {
            token: users.accessToken,
          },
        }
      );
      navigate(-1);
    } catch (err) {
      console.log(err);
    }
  };

  const handleNo = () => {
    navigate(-1);
  };
  return (
    <div className='flex flex-col gap-3 justify-center items-center'>
      <h3 className='text-logo-text-green text-2xl'>Delete Post!!!</h3>
      <p className='text-rose-500'>Are you sure you want to delete the post?</p>
      <div className='flex flex-row gap-5 justify-center items-center'>
        <button
          className='rounded-full p-2 w-24 my-4 bg-logo-text-green text-zinc-950'
          onClick={handleYes}
        >
          Yes
        </button>
        <button
          className='rounded-full p-2 w-24 my-4 bg-rose-500 text-zinc-950'
          onClick={handleNo}
        >
          No
        </button>
      </div>
    </div>
  );
};

export default DeletePost;

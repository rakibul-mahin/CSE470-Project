import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const EditPost = () => {
  const userDetails = useSelector((state) => state.user);
  let users = userDetails.user;
  const accesstoken = users.accessToken;
  const navigate = useNavigate();
  let location = useLocation();
  let pid = location.pathname.split("/")[3];
  const [desc, setDesc] = useState("");
  const [post, setPost] = useState([]);

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/get/post/byid/${pid}`
        );
        setPost(res.data.post);
        setDesc(res.data.post.desc);
      } catch (err) {
        console.log(err);
      }
    };
    getPost();
  }, []);
  console.log(post);

  const handleUpdate = async () => {
    try {
      const res = axios.put(
        `http://localhost:5000/api/update/post/${pid}`,
        { desc: desc },
        { headers: { token: accesstoken } }
      );
      navigate(-1);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className='mt-9 flex flex-col justify-center items-center'>
      <input
        type='text'
        placeholder='Post Description'
        name='desc'
        value={desc}
        className='input input-bordered input-info w-80'
        onChange={(e) => setDesc(e.target.value)}
      />
      <button
        className='rounded-full p-2 w-24 my-4 bg-logo-text-green text-zinc-950'
        onClick={handleUpdate}
      >
        Update
      </button>
    </div>
  );
};

export default EditPost;

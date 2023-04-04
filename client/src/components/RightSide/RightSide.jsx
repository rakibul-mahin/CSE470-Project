import React, { useEffect, useState } from "react";
import "./rightSide.css";
import axios from "axios";
import { useSelector } from "react-redux";
import Follow from "../Follow/Follow";

const RightSide = () => {
  const [users, setUsers] = useState([]);
  const userDetails = useSelector((state) => state.user);
  let user = userDetails.user;
  const accesstoken = user.accessToken;

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/suggest/user`, {
          headers: {
            token: accesstoken,
          },
        });
        setUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUsers();
  }, []);
  console.log(users);
  return (
    <div>
      <div className='mt-4 flex flex-col gap-2 card bg-slate-900 justify-center items-center p-3 overflow-y-scroll w-auto'>
        <p className='text-logo-text-green'>Follow Gamers</p>
        {users.map((item) => {
          if (item._id === userDetails.user.user._id) {
            return null;
          }
          return <Follow userdetails={item} key={item._id} />;
        })}
      </div>
    </div>
  );
};

export default RightSide;

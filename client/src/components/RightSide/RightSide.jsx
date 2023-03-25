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
    <div className='right-side'>
      <div className='right-kichu-ekta'>
        <p style={{ color: "white" }}>Follow Gamers</p>
        {users.map((item) => (
          <Follow userdetails={item} key={item._id} />
        ))}
      </div>
    </div>
  );
};

export default RightSide;

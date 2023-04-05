import React, { useEffect, useState } from "react";
import "./contact.css";
import Chat from "../Chat/Chat";
import axios from "axios";
import { useSelector } from "react-redux";

const Contact = () => {
  const userDetails = useSelector((state) => state.user);
  let users = userDetails.user;
  let id = users.user._id;
  const accesstoken = users.accessToken;
  const [currChat, setCurrChat] = useState("");

  const handleUser = (e) => {
    setCurrChat(e);
  };

  const [user, setUser] = useState([]);
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/all/following/${id}`,
          {
            headers: {
              token: accesstoken,
            },
          }
        );
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, []);

  return (
    <div className='flex flex-row gap-3 justify-center p-3'>
      <div>
        <div className='user-details-contact'>
          {user.map((item) => (
            <div className='flex flex-col gap-3 justify-center items-center'>
              {item._id !== id ? (
                <div
                  className='mt-4 flex flex-row gap-3 justify-center items-center mr-5 card bg-slate-900 w-auto shadow-xl p-3'
                  onClick={(e) => handleUser(item)}
                >
                  <div className='avatar'>
                    <div className='w-24 rounded-full'>
                      <img src={`${item.userimage}`} alt='profileimg' />
                    </div>
                  </div>
                  <div style={{ marginLeft: "10px" }}>
                    <p className='text-logo-text-green'>{item.username}</p>
                    <p className='text-logo-text-green'>text message</p>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          ))}
        </div>
      </div>
      {currChat === "" ? (
        <p className='text-logo-text-green'>Click a User to start chat</p>
      ) : (
        <Chat currUser={currChat} />
      )}
    </div>
  );
};

export default Contact;

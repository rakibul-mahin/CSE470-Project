import React, { useEffect, useRef, useState } from "react";
import "./chat.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

const Chat = ({ currUser }) => {
  const userDetails = useSelector((state) => state.user);
  let users = userDetails.user;
  let id = users.user._id;
  const accesstoken = users.accessToken;
  // const scrollRef = useRef();
  const scrollRef = useRef();
  const socket = useRef();
  const [message, setMessage] = useState([]);
  const [sendMessage, setSendMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  useEffect(() => {
    const getMessage = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/get/msg/${id}/${currUser._id}`,
          {
            headers: {
              token: accesstoken,
            },
          }
        );
        setMessage(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessage();
  }, [currUser._id]);

  const [user, setUser] = useState({});
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/get/user-details/${users.user._id}`
        );
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, []);

  console.log(user, 5);
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  useEffect(() => {
    if (currUser !== "") {
      socket.current = io("http://localhost:5000");
      socket.current.emit("addUser", id);
    }
  }, [id]);

  console.log(socket);

  const sendMessageHandler = async (e) => {
    const newMessage = {
      myself: true,
      message: sendMessage,
    };
    try {
      e.preventDefault();
      socket.current.emit("send-msg", {
        to: currUser._id,
        from: id,
        message: sendMessage,
      });
      await axios.post(
        `http://localhost:5000/api/msg`,
        { message: sendMessage, from: id, to: currUser._id },
        { headers: { token: accesstoken } }
      );
      setMessage(message.concat(newMessage));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-receive", (msg) => {
        console.log(msg);
        setArrivalMessage({ myself: false, message: msg });
      });
    }
  }, [arrivalMessage]);

  useEffect(() => {
    arrivalMessage && setMessage((pre) => [...pre, arrivalMessage]);
  }, [arrivalMessage]);

  console.log(currUser);
  return (
    <div className='main-chat-container'>
      <div>
        <div
          style={{
            display: "flex",
            marginLeft: "10px",
            marginTop: "20px",
            backgroundColor: "black",
            width: "70pc",
            padding: "10px",
            borderRadius: "10px",
            alignItems: "center",
          }}
        >
          <img
            src={`${currUser.userimage}`}
            alt='userchatimg'
            className='user-profile-chat'
          />
          <p style={{ marginTop: "10px", marginLeft: "10px" }}>
            {currUser.username}
          </p>
        </div>
        <div className='msg-container'>
          {message.map((item) => (
            <div ref={scrollRef}>
              {item.myself === false ? (
                <div className='chat chat-start'>
                  <div className='chat-image avatar'>
                    <div className='w-10 rounded-full'>
                      <img src={`${currUser.userimage}`} alt='otheruser' />
                    </div>
                  </div>
                  <div className='chat-header text-logo-text-green'>
                    {currUser.username}
                  </div>
                  <div className='chat-bubble text-logo-text-green'>
                    {item.message}
                  </div>
                  <div className='chat-footer opacity-50'>Delivered</div>
                </div>
              ) : (
                <div className='chat chat-end'>
                  <div className='chat-image avatar'>
                    <div className='w-10 rounded-full'>
                      <img src={`${user.userimage}`} alt='profile-img' />
                    </div>
                  </div>
                  <div className='chat-header text-logo-text-green'>
                    {user.username}
                    {/* <time className='text-xs opacity-50'>12:46</time> */}
                  </div>
                  <div className='chat-bubble text-logo-text-green'>
                    {item.message}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className='flex flex-row justify-center items-center gap-3'>
          <input
            type='text'
            className='input input-bordered input-info w-80'
            placeholder='Write your message'
            onChange={(e) => setSendMessage(e.target.value)}
          />
          <button
            className='rounded-full p-2 w-24 my-4 bg-logo-text-green text-zinc-950'
            onClick={sendMessageHandler}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;

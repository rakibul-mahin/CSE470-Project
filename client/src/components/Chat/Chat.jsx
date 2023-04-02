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

  // useEffect(() => {
  //   scrollRef.current.scrollIntoView({ behavior: "smooth" });
  // }, [message]);
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

  return (
    <div className='main-chat-container'>
      <div>
        <div
          style={{
            display: "flex",
            marginLeft: "10px",
            marginTop: "20px",
            backgroundColor: "grey",
            width: "70pc",
            padding: "10px",
            borderRadius: "10px",
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
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginLeft: "10px",
                    backgroundColor: "green",
                    marginTop: "10px",
                    padding: "5px",
                    borderRadius: "10px",
                    width: "450px",
                  }}
                >
                  <img
                    src={`${currUser.userimage}`}
                    alt='userchatimg'
                    className='user-profile-chat'
                  />
                  <p style={{ textAlign: "start", marginLeft: "10px" }}>
                    {item.message}
                  </p>
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginLeft: "650px",
                    backgroundColor: "green",
                    marginTop: "10px",
                    padding: "5px",
                    borderRadius: "10px",
                    width: "450px",
                  }}
                >
                  <p style={{ textAlign: "start", marginLeft: "20px" }}>
                    {item.message}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className='msg-sender-container'>
          <input
            type='text'
            className='msg-input'
            placeholder='Write your message'
            onChange={(e) => setSendMessage(e.target.value)}
          />
          <button className='msg-send-btn' onClick={sendMessageHandler}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;

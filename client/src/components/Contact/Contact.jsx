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
    <div className='main-contact-container'>
      <div>
        <div className='user-details-contact'>
          {user.map((item) => (
            <div>
              {item._id !== id ? (
                <div
                  className='user-container'
                  onClick={(e) => handleUser(item)}
                >
                  <img
                    src={`${item.userimage}`}
                    alt='profileimg'
                    className='contact-img'
                  />
                  <div style={{ marginLeft: "10px" }}>
                    <p
                      style={{
                        color: "black",
                        textAlign: "start",
                        marginTop: "1px",
                      }}
                    >
                      {item.username}
                    </p>
                    <p
                      style={{
                        color: "black",
                        textAlign: "start",
                        marginTop: "-10px",
                      }}
                    >
                      text message
                    </p>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          ))}
        </div>
      </div>
      {currChat === "" ? "Click" : <Chat currUser={currChat} />}
    </div>
  );
};

export default Contact;

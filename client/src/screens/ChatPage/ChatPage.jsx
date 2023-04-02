import React from "react";
import "./chatPage.css";
import Contact from "../../components/Contact/Contact";
import Chat from "../../components/Chat/Chat";
import Navbar from "../../components/Navbar/Navbar";

const ChatPage = () => {
  return (
    <div>
      <Navbar />
      <div style={{ display: "flex" }}>
        <Contact />
        {/* <Chat /> */}
      </div>
    </div>
  );
};

export default ChatPage;

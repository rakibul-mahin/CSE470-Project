import React from "react";
import "./chatPage.css";
import Contact from "../../components/Contact/Contact";
import Navbar from "../../components/Navbar/Navbar";

const ChatPage = () => {
  return (
    <div>
      <Navbar />
      <div className='flex'>
        <Contact />
      </div>
    </div>
  );
};

export default ChatPage;

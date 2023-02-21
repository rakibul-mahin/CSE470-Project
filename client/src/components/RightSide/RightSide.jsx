import React from "react";
import "./rightSide.css";

const RightSide = () => {
  return (
    <div className='right-side'>
      <div className='right-kichu-ekta'>
        <p>Follow Gamers</p>
        <div>
          <div className='one-user-container'>
            <div className='one-user'>
              <img
                src='https://images.unsplash.com/photo-1628260412297-a3377e45006f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80'
                alt='sm-user-profile'
                className='sm-follow-img'
              />
              <p style={{ marginLeft: "10px" }}>Gamer Name</p>
            </div>
            <div>
              <button className='follow-btn'>Follow</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSide;

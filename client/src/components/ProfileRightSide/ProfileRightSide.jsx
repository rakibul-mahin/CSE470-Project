import React from "react";
import "./profileRightSide.css";

const ProfileRightSide = () => {
  return (
    <div className='right-side'>
      <div className='container-one'>
        <h3 style={{ color: "white" }}>Following</h3>
        <div>
          <div
            style={{ display: "flex", marginLeft: "20px", marginTop: "5px" }}
          >
            <img
              src='https://images.unsplash.com/photo-1616776212814-fab73656dd8e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
              alt='followimg'
              className='follower-img'
            />
            <p style={{ color: "white", marginLeft: "10px" }}>Rakibul</p>
            <button
              style={{
                width: "100px",
                marginLeft: "50px",
                marginRight: "8px",
                marginBottom: "10px",
                padding: "3px",
                borderRadius: "15px",
                border: "None",
                backgroundColor: "green",
                color: "white",
                cursor: "pointer",
              }}
            >
              View Profile
            </button>
          </div>
          <div
            style={{ display: "flex", marginLeft: "20px", marginTop: "5px" }}
          >
            <img
              src='https://images.unsplash.com/photo-1616776212814-fab73656dd8e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
              alt='followimg'
              className='follower-img'
            />
            <p style={{ color: "white", marginLeft: "10px" }}>Rakibul</p>
            <button
              style={{
                width: "100px",
                marginLeft: "50px",
                marginRight: "8px",
                marginBottom: "10px",
                padding: "3px",
                borderRadius: "15px",
                border: "None",
                backgroundColor: "green",
                color: "white",
                cursor: "pointer",
              }}
            >
              View Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileRightSide;

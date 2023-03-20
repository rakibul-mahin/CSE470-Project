import React from "react";
import "./profileLeftSide.css";

const ProfileLeftSide = () => {
  return (
    <div className='left-side'>
      <div className='container-one'>
        <img
          src='https://images.unsplash.com/photo-1616776219911-83b9ca3402ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
          alt='profcover'
          className='profile-page-cover'
        />
        <div style={{ display: "flex", alignItems: "center", marginTop: -40 }}>
          <img
            src='https://images.unsplash.com/photo-1589419621083-1ead66c96fa7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
            alt='profimage'
            className='profile-page-image'
          />
          <div>
            <p
              style={{
                marginLeft: 7,
                marginTop: 35,
                color: "white",
                textAlign: "start",
              }}
            >
              Mickey Mouse
            </p>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p style={{ color: "white", marginLeft: 20 }}>Bio</p>
          <p
            style={{
              color: "white",
              marginRight: 50,
              fontSize: "10px",
              marginTop: "20px",
            }}
          >
            I am a gamer and I only play games
          </p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: -30,
          }}
        >
          <p style={{ color: "white", marginLeft: 20 }}>Followers</p>
          <p
            style={{
              color: "white",
              marginRight: 50,
              fontSize: "10px",
              marginTop: "25px",
            }}
          >
            10
          </p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: -30,
          }}
        >
          <p style={{ color: "white", marginLeft: 20 }}>Following</p>
          <p
            style={{
              color: "white",
              marginRight: 50,
              fontSize: "10px",
              marginTop: "25px",
            }}
          >
            5
          </p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: -30,
          }}
        >
          <p style={{ color: "white", marginLeft: 20 }}>Discord</p>
          <p
            style={{
              color: "white",
              marginRight: 50,
              fontSize: "10px",
              marginTop: "25px",
            }}
          >
            Discord Link
          </p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: -30,
          }}
        >
          <p style={{ color: "white", marginLeft: 20 }}>Address</p>
          <p
            style={{
              color: "white",
              marginRight: 50,
              fontSize: "10px",
              marginTop: "25px",
            }}
          >
            Dhaka
          </p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: -30,
          }}
        >
          <p style={{ color: "white", marginLeft: 20 }}>Email</p>
          <p
            style={{
              color: "white",
              marginRight: 50,
              fontSize: "10px",
              marginTop: "25px",
            }}
          >
            temp@gmail.com
          </p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: -30,
          }}
        >
          <p style={{ color: "white", marginLeft: 20 }}>Phone</p>
          <p
            style={{
              color: "white",
              marginRight: 50,
              fontSize: "10px",
              marginTop: "25px",
            }}
          >
            +88017xxxxxxxx
          </p>
        </div>
        <button
          style={{
            width: "90px",
            marginLeft: "90px",
            marginBottom: "10px",
            padding: "3px",
            borderRadius: "15px",
            border: "None",
            backgroundColor: "green",
            color: "white",
            cursor: "pointer",
          }}
        >
          Edit
        </button>
      </div>

      <div className='container-one'>
        <h3 style={{ color: "white" }}>Followers</h3>
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

export default ProfileLeftSide;

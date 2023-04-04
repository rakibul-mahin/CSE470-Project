import React from "react";
import "./profile.css";
import Navbar from "../../components/Navbar/Navbar";
import ProfileLeftSide from "../../components/ProfileLeftSide/ProfileLeftSide";
import ProfileMainPost from "../../components/ProfileMainPost/ProfileMainPost";
import ProfileRightSide from "../../components/ProfileRightSide/ProfileRightSide";

const Profile = () => {
  return (
    <div>
      <Navbar />
      <div className='flex flex-row gap-3'>
        <ProfileLeftSide />
        <ProfileMainPost />
        <ProfileRightSide />
      </div>
    </div>
  );
};

export default Profile;

import React from "react";
import "./profileMainPost.css";
import ContentPost from "../../components/ContentPost/ContentPost";

const ProfileMainPost = () => {
  return (
    <div className='profile-main-post'>
      <div>
        <img
          src='https://images.unsplash.com/photo-1616776219911-83b9ca3402ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
          alt='coverimg'
          className='profile-cover-image'
        />
      </div>
      <ContentPost />
    </div>
  );
};

export default ProfileMainPost;

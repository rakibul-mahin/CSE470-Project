import React, { useState } from "react";
import "./updateProfile.css";
import { useDispatch } from "react-redux";
import { updateProfile } from "../Redux/apiCall";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const UpdateProfile = () => {
  const navigate = useNavigate();
  let location = useLocation();
  //   let u_id = location.pathname.split("/")[3];
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.user);
  let users = userDetails.user;
  const accesstoken = users.accessToken;
  const uid = users.user._id;
  console.log(users.user.firstname);
  const [firstname, setFirstName] = useState(users.user.firstname);
  const [lastname, setLastName] = useState(users.user.lastname);
  const [bio, setBio] = useState(users.user.bio);
  const [address, setAddress] = useState(users.user.address);
  const [mobile, setMobile] = useState(users.user.mobile);
  const [gameprofile, setGameProfile] = useState(users.user.gameprofile);
  const handleUpdate = async (e) => {
    e.preventDefault();
    const info = { firstname, lastname, bio, address, mobile, gameprofile };
    try {
      await updateProfile(dispatch, info, uid, accesstoken);
    } catch (err) {
      console.log(err);
    }
  };
  const goBack = () => {
    if (location.search || location.hash) {
      navigate(location.pathname, { replace: true });
    }
    navigate(`/profile/${uid}`);
  };
  return (
    <div className='register-form-container'>
      <div className='sub-main-container'>
        <ArrowBackIosIcon onClick={goBack} />
        <div style={{ flex: 3 }}>
          <p className='create-account-text'>Update Profile</p>
          <input
            type='text'
            placeholder='First Name'
            name='firstname'
            className='input-text'
            value={firstname}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type='text'
            placeholder='Last Name'
            name='lastname'
            className='input-text'
            value={lastname}
            onChange={(e) => setLastName(e.target.value)}
          />
          <input
            type='text'
            placeholder='Bio'
            name='bio'
            className='input-text'
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
          <input
            type='text'
            placeholder='Mobile'
            name='mobile'
            className='input-text'
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
          <input
            type='text'
            placeholder='Address'
            name='address'
            className='input-text'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <input
            type='text'
            placeholder='Discord'
            name='gameprofile'
            className='input-text'
            value={gameprofile}
            onChange={(e) => setGameProfile(e.target.value)}
          />

          <button className='register-btn' onClick={handleUpdate}>
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;

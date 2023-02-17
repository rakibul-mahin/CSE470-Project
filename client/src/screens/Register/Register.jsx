import React, { useState } from "react";
import "./register.css";
import { Link } from "react-router-dom";
import { register } from "../../components/Redux/apiCall";
import { useDispatch } from "react-redux";

const Register = () => {
  const dispatch = useDispatch();
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const handleRegistration = (e) => {
    e.preventDefault();
    register(dispatch, {
      firstname,
      lastname,
      username,
      email,
      password,
      repassword,
    });
  };
  return (
    <div className='register-form-container'>
      <div className='sub-main-container'>
        <div style={{ flex: 1, marginLeft: 150, marginBottom: "170px" }}>
          <p className='logo-text'>GameVerse</p>
          <p className='intro-text'>Dive into the world of Games</p>
        </div>
        <div style={{ flex: 3 }}>
          <p className='create-account-text'>GameVerse | Register</p>
          <input
            type='text'
            placeholder='First Name'
            name='firstname'
            className='input-text'
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type='text'
            placeholder='Last Name'
            name='lastname'
            className='input-text'
            onChange={(e) => setLastName(e.target.value)}
          />
          <input
            type='text'
            placeholder='Username'
            name='username'
            className='input-text'
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type='text'
            placeholder='Email'
            name='email'
            className='input-text'
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type='password'
            placeholder='Password'
            name='password'
            className='input-text'
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type='password'
            placeholder='Confirm Password'
            name='repassword'
            className='input-text'
            onChange={(e) => setRepassword(e.target.value)}
          />
          <button className='register-btn' onClick={handleRegistration}>
            Dive In
          </button>
          <Link to={"/login"}>
            <p style={{ textAlign: "start", marginLeft: "600px" }}>
              Already have an account?
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;

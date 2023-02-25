import React, { useState } from "react";
import "./login.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../components/Redux/apiCall";
import VisibilityIcon from '@mui/icons-material/Visibility';

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [view, setView] = useState(false)
  const handleLogin = (e) => {
    e.preventDefault();
    login(dispatch, { email, password });
  };
  return (
    <div className='register-form-container'>
      <div className='sub-main-container'>
        <div style={{ flex: 1, marginLeft: 150, marginBottom: "170px" }}>
          <p className='logo-text'>GameVerse</p>
          <p className='intro-text'>Dive into the world of Games</p>
        </div>
        <div style={{ flex: 3 }}>
          <p className='create-account-text'>GameVerse | Login</p>
          <input
            type='text'
            placeholder='Email'
            name='email'
            id='email'
            className='input-text'
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type={view ? `text` : `password`}
            // type='password'
            placeholder='Password'
            name='password'
            id='password'
            className='input-text'
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <VisibilityIcon onClick={(e)=>setView(!view)} style={{cursor: "pointer"}}/>
          <button className='register-btn' onClick={handleLogin}>
            Dive In
          </button>
          <Link to={"/register"}>
            <p style={{ textAlign: "start", marginLeft: "600px" }}>
              Don't have an account?
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

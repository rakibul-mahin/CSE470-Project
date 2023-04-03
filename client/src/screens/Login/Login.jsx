import React, { useState } from "react";
import "./login.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../components/Redux/apiCall";
import VisibilityIcon from "@mui/icons-material/Visibility";
import GamepadIcon from "@mui/icons-material/Gamepad";

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [view, setView] = useState(false);
  const handleLogin = (e) => {
    e.preventDefault();
    login(dispatch, { email, password });
  };
  return (
    <div>
      <div className='flex h-screen flex-row justify-center items-center'>
        <div className='basis-1/3'>
          <div className='flex flex-col gap-4 justify-center items-center'>
            <span className='flex flex-row gap-4 items-center'>
              <GamepadIcon
                className='text-logo-img-yellow mx-2'
                style={{ transform: "scale(2.5)" }}
              />
              <p className='text-7xl '>
                <span className='text-logo-text-green'>GameVerse</span>
              </p>
            </span>
            <p className='text-2xl text-indigo-50'>
              "Dive into the world of Gamers"
            </p>
          </div>
        </div>

        <div className='flex flex-col justify-center items-center gap-3'>
          <p className='text-logo-text-green text-2xl my-3'>Login</p>
          <input
            type='text'
            placeholder='Email'
            className='input input-bordered input-info w-80'
            name='email'
            id='email'
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <div className='relative w-full max-w-xs'>
            <input
              type={view ? `text` : `password`}
              placeholder='Password'
              className='input input-bordered input-info w-full max-w-xs'
              name='password'
              id='password'
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <VisibilityIcon
              onClick={(e) => setView(!view)}
              style={{
                cursor: "pointer",
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
              }}
            />
          </div>
          <button
            className='rounded-full p-2 w-24 my-4 bg-logo-text-green text-zinc-950'
            onClick={handleLogin}
          >
            Log In
          </button>
          <Link to={"/register"}>
            <p className='text-indigo-50'>Don't have an account?</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

import React, { useState } from "react";
import "./register.css";
import { Link } from "react-router-dom";
import { register } from "../../components/Redux/apiCall";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { registrationSchema } from "../../schemas";
import VisibilityIcon from "@mui/icons-material/Visibility";
import GamepadIcon from "@mui/icons-material/Gamepad";

const initialValues = {
  firstname: "",
  lastname: "",
  username: "",
  email: "",
  password: "",
  repassword: "",
};

const Register = () => {
  const dispatch = useDispatch();
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: registrationSchema,
      onSubmit: (values, action) => {
        register(dispatch, {
          firstname: values.firstname,
          lastname: values.lastname,
          username: values.username,
          email: values.email,
          password: values.password,
          repassword: values.repassword,
        });
        action.resetForm();
      },
    });

  const [view, setView] = useState(false);

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
          <p className='text-logo-text-green text-2xl my-3'>Register</p>

          <input
            type='text'
            placeholder='First Name'
            name='firstname'
            className='input input-bordered input-info w-80'
            value={values.firstname}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.firstname && touched.firstname ? (
            <p className='text-rose-500 uppercase text-xs'>
              {errors.firstname}
            </p>
          ) : null}
          <input
            type='text'
            placeholder='Last Name'
            name='lastname'
            className='input input-bordered input-info w-80'
            value={values.lastname}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.lastname && touched.lastname ? (
            <p className='text-rose-500 uppercase text-xs'>{errors.lastname}</p>
          ) : null}
          <input
            type='text'
            placeholder='Username'
            name='username'
            className='input input-bordered input-info w-80'
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.username && touched.username ? (
            <p className='text-rose-500 uppercase text-xs'>{errors.username}</p>
          ) : null}
          <input
            type='text'
            placeholder='Email'
            name='email'
            className='input input-bordered input-info w-80'
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.email && touched.email ? (
            <p className='text-rose-500 uppercase text-xs'>{errors.email}</p>
          ) : null}
          <div className='relative w-full max-w-xs'>
            <input
              type={view ? `text` : `password`}
              placeholder='Password'
              name='password'
              className='input input-bordered input-info w-80'
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.password && touched.password ? (
              <p className='text-rose-500 uppercase text-xs'>
                {errors.password}
              </p>
            ) : null}
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
          <input
            type='password'
            placeholder='Confirm Password'
            name='repassword'
            className='input input-bordered input-info w-80'
            value={values.repassword}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.repassword && touched.repassword ? (
            <p className='text-rose-500 uppercase text-xs'>
              {errors.repassword}
            </p>
          ) : null}
          <button
            className='rounded-full p-2 w-24 my-4 bg-logo-text-green text-zinc-950'
            onClick={handleSubmit}
          >
            Sign Up
          </button>
          <Link to={"/login"}>
            <p className='text-indigo-50'>Already have an account?</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;

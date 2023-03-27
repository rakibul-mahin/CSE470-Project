import axios from "axios";
import {
  loginStart,
  loginSuccess,
  loginFailure,
  registrationStart,
  registrationFailure,
  registrationSuccess,
  updateSuccess,
  updateStart,
  updateFailure,
  proPicFailure,
  proPicStart,
  proPicSuccess,
} from "./userReducer";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(`http://localhost:5000/api/login`, user);
    console.log(res.data, 100);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const register = async (dispatch, user) => {
  dispatch(registrationStart());
  try {
    const res = await axios.post(`http://localhost:5000/api/create/user`, user);
    dispatch(registrationSuccess(res.data));
  } catch (err) {
    dispatch(registrationFailure());
  }
};

export const updateProfile = async (dispatch, user, uid, accessToken) => {
  dispatch(updateStart());
  try {
    const res = await axios.put(
      `http://localhost:5000/api/update/profile/${uid}`,
      user,
      {
        headers: {
          token: accessToken,
        },
      }
    );
    dispatch(updateSuccess(res.data));
  } catch (err) {
    dispatch(updateFailure());
  }
};

export const updateProPic = async (dispatch, user, uid, accessToken) => {
  dispatch(proPicStart());
  try {
    const res = await axios.put(
      `http://localhost:5000/api/update/profile/pic/${uid}`,
      user,
      {
        headers: {
          token: accessToken,
        },
      }
    );
    dispatch(proPicSuccess(res.data));
  } catch (err) {
    dispatch(proPicFailure());
  }
};

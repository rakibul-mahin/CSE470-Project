import axios from "axios";
import {
  loginStart,
  loginSuccess,
  loginFailure,
  registrationStart,
  registrationFailure,
  registrationSuccess,
} from "./userReducer";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(`http://localhost:5000/api/login`, user);
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

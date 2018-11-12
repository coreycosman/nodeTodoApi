import axios from 'axios'
import { LOGIN_USER, GET_ERRORS } from "./types";

export const login = (formProps, callback) => async dispatch => {
  try {
    const response = await axios.post('/users/login', formProps)
    dispatch({ type: LOGIN_USER, payload: response.data});
    // callback for route redirect
    callback();
  } catch (e) {
    dispatch({ type: GET_ERRORS, payload: e.response.data })
  }
};

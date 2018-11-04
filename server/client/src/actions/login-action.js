import axios from 'axios'
import { LOGIN_USER, LOGIN_ERROR } from "./types";

export const login = (formProps, callback) => async dispatch => {
  try {
    const response = await axios.post('/users/login', formProps)
    dispatch({ type: LOGIN_USER, payload: response.data.token});
    // callback for route redirect
    callback();
  } catch (e) {
    dispatch({ type: LOGIN_ERROR, payload: 'error' })
  }
};

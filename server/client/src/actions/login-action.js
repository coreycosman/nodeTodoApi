import axios from 'axios'
import setAuthToken from '../utils/set-auth-token'
import jwtDecode from 'jwt-decode'

import { LOGIN_USER, SET_CURRENT_USER, GET_ERRORS } from "./types";

export const login = (formProps, callback) => async dispatch => {
  try {
    const response = await axios.post('/users/login', formProps)
    const token = response.data;
    localStorage.setItem('jwtToken', token);
    setAuthToken(token);
    const decoded = jwtDecode(token)

    dispatch({ type: LOGIN_USER, payload: decoded });
    // callback for route redirect
    callback();
  } catch (e) {
    dispatch({ type: GET_ERRORS, payload: e.response.data })
  }
};

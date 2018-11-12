import axios from 'axios'
import { SIGNUP_USER, GET_ERRORS } from "./types";

export const signup = (formProps, callback) => async dispatch => {
  try {
    const response = await axios.post('/users', formProps)
    console.log(response.data);
    dispatch({ type: SIGNUP_USER, payload: response.data});
    // callback for route redirect
    callback();
  } catch (e) {
    dispatch({ type: GET_ERRORS, payload: e.response.data })
  }
};

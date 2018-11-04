import axios from 'axios'
import { FETCH_USER, SET_CURRENT_USER, AUTH_ERROR } from "./types";

// export const fetchUser = () => async dispatch =>
//   ({ type: FETCH_USER, payload: await axios.get('/users/me').data});

export const signup = (formProps, callback) => async dispatch => {
  try {
    const response = await axios.post('/users', formProps)
    dispatch({ type: SET_CURRENT_USER, payload: response.data.token});
    // callback for route redirect
    callback();
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: 'email in use' })
  }
};

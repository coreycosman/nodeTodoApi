import { SIGNUP_USER, LOGIN_USER, SET_CURRENT_USER } from "../actions/types";

const INITIAL_STATE = {
  loggedIn: false,
  token: ''
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SIGNUP_USER:
      return {...state, loggedIn: true, token: action.payload};
    case LOGIN_USER:
      return { ...state, loggedIn: true, user: action.payload };
  default:
    return state;
  }
}

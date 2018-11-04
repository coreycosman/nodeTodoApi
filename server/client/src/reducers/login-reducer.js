import { LOGIN_USER, LOGIN_ERROR } from "../actions/types";

const INITIAL_STATE = {
  loggedIn: '',
  errorMessage: ''
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loggedIn: action.payload };
    case LOGIN_ERROR:
      return { ...state, errorMessage: action.payload };
  default:
    return state;
  }
}

import { FETCH_USER, SET_CURRENT_USER, AUTH_ERROR } from "../actions/types";

const INITIAL_STATE = {
  authenticated: '',
  errorMessage: ''
}
// const INITIAL_STATE = {
//   isAuthenticated: true,
//   user: {},
//   errorMessage: ''
// }

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    // case FETCH_USER:
    //   return action.payload || false;
    case SET_CURRENT_USER:
      return { ...state, authenticated: action.payload };
    case AUTH_ERROR:
      return { ...state, errorMessage: action.payload };
  default:
    return state;
  }
}

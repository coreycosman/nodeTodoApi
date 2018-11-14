import { SET_CURRENT_USER, LOGOUT_USER } from "../actions/types";
import isEmpty from '../utils/is-empty'

const INITIAL_STATE = {
  loggedIn: false,
  user: ''
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {...state, loggedIn: !isEmpty(action.payload), user: action.payload};
  default:
    return state;
  }
}

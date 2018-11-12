import { GET_ERRORS } from "../actions/types";

const INITIAL_STATE = {
errorsObject: {}
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_ERRORS:
      return {...state, errorsObject: action.payload};
  default:
    return state;
  }
}

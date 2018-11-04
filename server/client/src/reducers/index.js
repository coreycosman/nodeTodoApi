import { combineReducers } from "redux";
import authReducer from "./auth-reducer";
import loginReducer from "./login-reducer"
import logoutReducer from "./logout-reducer";
import { reducer as formReducer } from "redux-form";

export default combineReducers({
  auth: authReducer,
  login: loginReducer,
  logout: logoutReducer,
  form: formReducer
});

import { combineReducers } from "redux";
import authReducer from "./auth-reducer";
import loginReducer from "./login-reducer"
import logoutReducer from "./logout-reducer";
import errorsReducer from "./errors-reducer";
import { reducer as formReducer } from "redux-form";

export default combineReducers({
  auth: authReducer,
  form: formReducer,
  errors: errorsReducer
});

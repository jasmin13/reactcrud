import { combineReducers } from "redux";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import errorReducer from "./errorReducer";
import successReducer from "./successReducer";
import { reducer as formReducer } from "redux-form";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  form: formReducer,
  errors: errorReducer,
  success: successReducer
});

export default rootReducer;

import auth from "../auth/reducer/authReducer";
import user from "../user/reducer/userReducer";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  auth,
  user
});
export default allReducers;

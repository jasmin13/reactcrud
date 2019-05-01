import { SET_CURRENT_USER } from "../actions/types";
const isEmpty = require("is-empty");

const initState = {
  isAuthenticated: false,
  user: {}
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };

    default:
      return state;
  }
};
export default authReducer;

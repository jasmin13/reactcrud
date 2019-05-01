import { GET_USER_DATA, GET_USER, ADD_DATA_SUCCESS } from "../actions/types";

const initState = {
  person: {},
  success: {}
};

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_USER_DATA:
      return {
        ...state,
        person: action.payload
      };

    case GET_USER:
      return {
        ...state,
        person: action.payload
      };

    case ADD_DATA_SUCCESS:
      return {
        ...state,
        success: action.success
      };

    default:
      return state;
  }
};

export default userReducer;

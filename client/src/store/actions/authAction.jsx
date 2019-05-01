import axios from "axios";
import { GET_ERRORS, SET_CURRENT_USER, ADD_DATA_SUCCESS } from "./types";
import setAuthToken from "./../../utils/setAuthToken";

export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => {
      console.log(res);
      if (res.data.status === 401) {
        dispatch({
          type: GET_ERRORS,
          payload: res.data.errors ? res.data.errors : res.data
        });
      } else {
        dispatch({
          type: ADD_DATA_SUCCESS,
          payload: res.data.success
        });
        history.push("/");
      }
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err
      });
    });
};

export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      console.log(res);
      if (res.data.status === 401 || !res.data.token) {
        dispatch({
          type: GET_ERRORS,
          payload: res.data.errors
        });
        dispatch({
          type: ADD_DATA_SUCCESS,
          payload: ""
        });
      } else {
        setAuthToken(res.data.token);
        dispatch(setCurrentUser(res.data));
      }
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err
      });
    });
};

export const setCurrentUser = data => {
  return {
    type: SET_CURRENT_USER,
    payload: data
  };
};

// Get current user
export const getCurrentUser = () => dispatch => {
  axios
    .get("/api/users/currentuser")
    .then(res => {
      if (res.data.token) {
        setAuthToken(res.data.token);
        dispatch(setCurrentUser(res.data));
      } else {
        dispatch({
          type: GET_ERRORS,
          payload: res.data
        });
      }
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err
      })
    );
};

export const logoutUser = history => dispatch => {
  axios.get("/api/users/logout").then(res => {
    if (res.data.status === "success") {
      setAuthToken(false);
      dispatch(setCurrentUser({}));
      history.push("/");
    }
  });
};

export const resetMsg = () => dispatch => {
  dispatch({
    type: ADD_DATA_SUCCESS,
    payload: ""
  });

  dispatch({
    type: GET_ERRORS,
    payload: ""
  });
};

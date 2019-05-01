import axios from "axios";
import { GET_ERRORS, GET_USER_DATA, GET_USER, ADD_DATA_SUCCESS } from "./types";
import setAuthToken from "./../../utils/setAuthToken";
import { setCurrentUser } from "./authAction";

export const getAllUser = userData => dispatch => {
  axios
    .get("/api/users/" + userData)
    .then(res => {
      if (res.data.status === 401) {
        dispatch({
          type: GET_ERRORS,
          payload: res.data
        });
      } else {
        if (res.data) {
          dispatch({
            type: GET_USER_DATA,
            payload: res.data
          });
        } else {
          dispatch({
            type: GET_ERRORS,
            payload: res.data
          });
        }
      }
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err
      })
    );
};

export const getUser = (userData, history) => dispatch => {
  axios
    .get("/api/users/getUser/" + userData)
    .then(res => {
      if (res.data.status === 401) {
        setAuthToken(false);
        dispatch(setCurrentUser({}));
        history.push("/");
      } else if (res.data.status === 200) {
        dispatch({
          type: GET_ERRORS,
          payload: res.data
        });
      } else {
        dispatch({
          type: GET_USER,
          payload: res.data
        });
      }
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err
      });
    });
};

export const searchUser = (userData, history) => dispatch => {
  console.log(userData);
  axios
    .get("/api/users/searchUser/" + userData)
    .then(res => {
      if (res.data.status === 401) {
        setAuthToken(false);
        dispatch(setCurrentUser({}));
        history.push("/");
      } else if (res.data.status === 200) {
        dispatch({
          type: GET_ERRORS,
          payload: res.data
        });
      } else {
        dispatch({
          type: GET_USER,
          payload: res.data
        });
      }
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err
      });
    });
};

export const addUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/addUser", userData)
    .then(res => {
      if (res.data.status === 401) {
        setAuthToken(false);
        dispatch(setCurrentUser({}));
        history.push("/");
      } else if (res.data.errors === 200) {
        dispatch({
          type: GET_ERRORS,
          payload: res.data
        });
      } else {
        dispatch({
          type: ADD_DATA_SUCCESS,
          payload: res.data.success
        });
        history.push("/home");
      }
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err
      });
    });
};

export const editUser = (userData, history) => dispatch => {
  axios
    .put("/api/users/editUser/" + userData.id, userData)
    .then(res => {
      if (res.data.status === 401) {
        setAuthToken(false);
        dispatch(setCurrentUser({}));
        history.push("/");
      } else {
        history.push("/home");
      }
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err
      });
    });
};

export const deleteUser = (userData, history) => dispatch => {
  axios.delete("/api/users/deleteUser/" + userData).then(res => {
    console.log(res);
    if (res.data.status === 401) {
      setAuthToken(false);
      dispatch(setCurrentUser({}));
      history.push("/");
    } else if (res.status === 200) {
      dispatch({
        type: ADD_DATA_SUCCESS,
        payload: res.data.success
      });
      dispatch(getAllUser());
    }
  });
};

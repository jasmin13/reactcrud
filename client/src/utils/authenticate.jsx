import { axios } from "axios";
import { GET_ERRORS, GET_USER } from "./../store/actions/types";
import setAuthToken from "./setAuthToken";
import { setCurrentUser } from "./../store/actions/authAction";

const authenticate = store => next => action => {
  next(action);

  const { url, method } = action;

  const req =
    method === "post"
      ? axios.post(url)
      : method === "put"
      ? axios.put(url)
      : method === "delete"
      ? axios.delete(url)
      : axios.get(url);

  req
    .then(res => {
      if (res.data.status === 401) {
        setAuthToken(false);
        store.dispatch(setCurrentUser({}));
      } else if (res.data.errors === 200) {
        return next({
          type: GET_ERRORS,
          payload: res.data
        });
      } else {
        return next({
          type: GET_USER,
          payload: res.data
        });
      }
    })
    .catch(err => {
      return next({
        type: GET_ERRORS,
        payload: err
      });
    });
};

export default authenticate;

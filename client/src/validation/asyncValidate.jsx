import axios from "axios";

export const asyncValidate = values => {
  const response = axios.post("/api/users/checkUser", values, {
    validateStatus: function(status) {
      return status < 500; // Reject only if the status code is greater than or equal to 500
    }
  });
  return response.then(response => {
    let { data } = response;
    if (data.status === 401) {
      throw data;
    }
  });
};

export const asyncValidatePerson = values => {
  const response = axios.post("/api/users/checkPerson", values, {
    validateStatus: function(status) {
      return status < 500; // Reject only if the status code is greater than or equal to 500
    }
  });
  return response.then(response => {
    let { data } = response;
    if (data.status === 401) {
      throw data;
    }
  });
};

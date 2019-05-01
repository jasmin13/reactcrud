const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegister(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.firstName = !isEmpty(data.firstName) ? data.firstName : "";
  data.lastName = !isEmpty(data.lastName) ? data.lastName : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password_confirm = !isEmpty(data.password_confirm)
    ? data.password_confirm
    : "";

  // firstName checks
  if (Validator.isEmpty(data.firstName)) {
    errors.firstName = "First Name field is required";
  }

  // lastName checks
  if (Validator.isEmpty(data.lastName)) {
    errors.lastName = "Last Name field is required";
  }

  // Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  // Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (Validator.isEmpty(data.password_confirm)) {
    errors.password_confirm = "Confirm password field is required";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }

  if (!Validator.equals(data.password, data.password_confirm)) {
    errors.password_confirm = "Passwords must match";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

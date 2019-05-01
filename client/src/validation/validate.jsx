export const required = value => (value ? undefined : "Required!");

export const longEnough = value =>
  value && value.length >= 6 ? undefined : "Must be 6 characters or more!";

export const email = value =>
  value && /(.+)@(.+){2,}\.(.+){2,}/i.test(value)
    ? undefined
    : "Invalid email!";

export const phoneNumber = value =>
  value && !/^(0|[1-9][0-9]{9})$/i.test(value)
    ? "Invalid phone number, must be 10 digits"
    : undefined;

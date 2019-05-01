import React from "react";

const renderField = ({
  input,
  id,
  type,
  placeholder,
  meta: { touched, error }
}) => (
  <div>
    <input {...input} id={id} placeholder={placeholder} type={type} />
    {touched && (error && <span style={{ color: "red" }}>{error}</span>)}
  </div>
);

export default renderField;

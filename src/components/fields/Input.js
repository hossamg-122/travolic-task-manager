import React from "react";
import { TextField } from "@material-ui/core";
import { ErrorMessage, useField } from "formik";
const Input = ({ label, ...props }) => {
    const [field, meta] = useField(props);

  return (
    <TextField
      error={meta.touched && meta.error ? true : false}
      variant="outlined"
      label={label}
      {...field}
      {...props}
      helperText={<ErrorMessage name={field.name} />}
    />
  );
};
export default Input;

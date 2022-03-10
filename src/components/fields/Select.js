import React from "react";
import {
  FormControl,
  InputLabel,
  Select as MuiSelect,
  MenuItem,
} from "@material-ui/core";
import { ErrorMessage, useField } from "formik";
import makeStyles from "./style"
const Select = ({ label, options, ...props }) => {
  const useStyles = makeStyles;
  const classes = useStyles();
  const [field, meta] = useField(props);
console.log(field)
  return (
    <FormControl variant="outlined">
      <InputLabel>{label}</InputLabel>
      <MuiSelect
        label={label}
        error={meta.touched && meta.error ? true : false}
        {...field}
        {...props}
      
      >
       
        {options.map((item) => (
          <MenuItem key={item.id} value={
            item.id}>
            {item.title}
          </MenuItem>
        ))}
      </MuiSelect>
      {meta.touched && meta.error && <p className={classes.errorMessage}> {meta.error }</p>}
    </FormControl>
  );
};
export default Select;

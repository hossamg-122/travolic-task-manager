import React from "react";
import { Grid } from "@material-ui/core";
import Fields from "../../components/fields/Fields";
import { Formik, Form } from "formik";
import * as localData from "../../data/localData";
import * as yup from "yup";
import { makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { addTask, editTask } from "../../store/actions";

// this component is for creating task form in both creating and editing process
// I use Formik and yup to control and validate the form they are so powerful

const TaskForm = () => {
  const useStyles = makeStyles((theme) => ({
    root: {
      "& .MuiFormControl-root": {
        width: "80%",
        margin: theme.spacing(1),
      },
    },
  }));

  const classes = useStyles();
  const dispatcher = useDispatch();

  // I get the initial values of the form from redux to make it easy during editing as I fire an action to set the initial values with
  // the values of the task that user wants to edit
  const initialValues = useSelector((state) => state.taskValues);
  
  // this is the validation component of the values
  const validation = yup.object({
    title: yup.string().required("required"),
    description: yup.string().required("required"),
    start_date: yup.string().required("required"),

    // this validate that dead line is after the start date
    dead_line: yup
      .string()
      .required("required")
      .test({
        name: "string",
        exclusive: false,
        params: {},
        message: "Dead Line must be after Start Date",
        test: function (value) {
          return value >= this.parent.start_date;
        },
      }),
    priority: yup.string().required("required"),
    assigned_to:yup.string().required("required"),
    status: yup.string().required("required"),
  });
  
  

  const handleSubmit = (values) => {
    // this function fires the action of adding or editing the task regarding that the task has id which means it's an existing task or not 
    // which means it's a new task
    if (values.id) {
      dispatcher(editTask(values));
    } else {
      dispatcher(addTask(values));
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validation}
      onSubmit={(values) => {
        handleSubmit(values);
      }}
    >
      {(formValues) => (
        <Form>
          <Grid container className={classes.root}>
            <Grid item xs={6}>
              <Fields.Input name="title" label="Title" />
              <Fields.Input label="Description" name="description"  multiline
                      rows={5} />
              <Fields.Input
                name="start_date"
                label="Start Date"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <Fields.Input
                name="dead_line"
                label="Dead Date"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <Fields.Select
                name="priority"
                label="Priority"
                options={localData.priorities}
              />
              <Fields.Select
                name="assigned_to"
                label="Assigned_to"
                options={localData.employees}
              />
              <Fields.Select
                name="status"
                label="Status"
                options={localData.status}
              />
            </Grid>
            <Grid item xs={12} container justifyContent="center">
              <div>
                <Fields.Button type="submit" text="Submit" />
                <Fields.Button
                  text="Reset"
                  color="default"
                  onClick={() => formValues.resetForm()}
                />
              </div>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};
export default TaskForm;

import React, { useState } from "react";
import TaskForm from "./TaskForm";
import PageHeader from "../../components/PageHeader";
import {
  Paper,
  makeStyles,
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
} from "@material-ui/core";
import useTable from "../../components/useTable";
import Fields from "../../components/fields/Fields";
import AddIcon from "@material-ui/icons/Add";
import Popup from "../../components/Popup";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import CloseIcon from "@material-ui/icons/Close";
import Notification from "../../components/Notification";
import ConfirmDialog from "../../components/ConfirmDialog";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask } from "../../store/actions";
import { UPDATE_FORM_VALUES } from "../../store/actions/types";
import logo from "../../assets/travolic.png";
import * as localData from "../../data/localData";
import * as utiles from "../../store/actions/utiles";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  searchInput: {
    width: "75%",
  },
  newButton: {
    position: "absolute",
    right: "10px",
    backgroundColor: theme.palette.primary.light,
  },
}));

// this component controls tasks table and fetch it's data from redux
const TaskManager = () => {
  const tasks = useSelector(({ tasks }) => tasks);
  const dispatcher = useDispatch();
  const classes = useStyles();

  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });

  // this function creates the table header and handles sorting and pagination
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(tasks, localData.headCells, filterFn);

    // this function calls when user clicks delete button
  const onDelete = (id) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    dispatcher(deleteTask(id));
  };

   // this function calls when user clicks edit button
const onEdit = (item) => {
  dispatcher({
    type: UPDATE_FORM_VALUES,
    payload: item,
  });
  dispatcher({
    type: "openPopup",
    payload: true,
  });
}
  return (
    <>
      <PageHeader
        title="Travolic Task Manager"
        subTitle="Get Ready For Your Next Adventure"
        logo={logo}
      />
      <Paper className={classes.pageContent}>
        <Toolbar>
          <Fields.Button
            text="Add Task"
            variant="outlined"
            startIcon={<AddIcon />}
            className={classes.newButton}
            onClick={() => {
              dispatcher({
                type: "openPopup",
                payload: true,
              });
            }}
          />
        </Toolbar>
        <TblContainer>
          <TblHead />
          <TableBody>
            {recordsAfterPagingAndSorting().map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>{item.start_date}</TableCell>
                <TableCell>{item.dead_line}</TableCell>
                 {/* those utiles functions display the title of the cell depending on the id */}
                <TableCell>{utiles.getPriority(item.priority)}</TableCell>
                <TableCell>{utiles.getEmployee(item.assigned_to)}</TableCell>
                <TableCell>{utiles.getStatue(item.status)}</TableCell>
                <TableCell>
                  <Fields.ActionButton
                    color="primary"
                    onClick={() => {
                      onEdit(item)
                    }}
                  >
                    <EditOutlinedIcon fontSize="small" />
                  </Fields.ActionButton>
                  <Fields.ActionButton
                    color="secondary"
                    onClick={() => {
                      setConfirmDialog({
                        isOpen: true,
                        title: "Are you sure to delete this Task?",
                        subTitle: "You can't undo this operation",
                        onConfirm: () => {
                          onDelete(item.id);
                        },
                      });
                    }}
                  >
                    <CloseIcon fontSize="small" />
                  </Fields.ActionButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TblContainer>
        <TblPagination />
      </Paper>
      <Popup title="Task Form">
        <TaskForm />
      </Popup>
      <Notification />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
}
export default TaskManager;
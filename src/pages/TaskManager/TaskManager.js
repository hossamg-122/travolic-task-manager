import React, { useState } from "react";
import TaskForm from "./TaskForm";
import PageHeader from "../../components/PageHeader";
import PeopleOutlineTwoToneIcon from "@material-ui/icons/PeopleOutlineTwoTone";
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
import logo from "../../assets/travolic.png"
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

const headCells = [
  { id: "title", label: "Title",disableSorting:true },
  { id: "description", label: "Description",disableSorting:true },
  { id: "start_date", label: "Start Date" },
  { id: "dead_line", label: "Dead Line" },
  { id: "priority", label: "Priority" },
  { id: "assigned_to", label: "Assigned To",disableSorting:true },
  { id: "status", label: "Status" },
  { id: "actions", label: "Actions", disableSorting: true },
];

export default function TaskManager() {
  const tasks = useSelector(({tasks}) => tasks);
 
 
  const dispatcher = useDispatch();
  console.log(tasks);
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

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(tasks, headCells, filterFn);

  

 

  
  const onDelete = (id) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    dispatcher(deleteTask(id));

    
  };

  return (
    <>
      <PageHeader
        title="Travolic Task Manager"
        subTitle="Get Ready For Your Next Adventure"
        logo={logo}
       // icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
      />
      <Paper className={classes.pageContent}>
        <Toolbar>
          {/* <Fields.Input
            label="Search Employees"
            className={classes.searchInput}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          
          /> */}
          <Fields.Button
            text="Add Task"
            variant="outlined"
            startIcon={<AddIcon />}
            className={classes.newButton}
            onClick={() => {
             dispatcher({
                 type:'openPopup',
                 payload:true
             })
              
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
                <TableCell>{item.priority}</TableCell>
                <TableCell>{item.assigned_to}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>
                  <Fields.ActionButton
                    color="primary"
                    onClick={() => {
                      dispatcher({
                        type: UPDATE_FORM_VALUES,
                        payload: item,
                      });
                      dispatcher({
                        type: 'openPopup',
                        payload: true,
                      });
                    }}
                  >
                    <EditOutlinedIcon fontSize="small" />
                  </Fields.ActionButton>
                  <Fields.ActionButton
                    color="secondary"
                    onClick={() => {
                      setConfirmDialog({
                        isOpen: true,
                        title: "Are you sure to delete this record?",
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
      <Popup
        title="Task Form"
      
        
      >
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

import React from 'react'
import { Dialog, DialogTitle, DialogContent, makeStyles, Typography } from '@material-ui/core';
import Controls from "./fields/Fields";
import CloseIcon from '@material-ui/icons/Close';
import { useDispatch,useSelector } from 'react-redux';
import { RESET_FORM_VALUES } from '../store/actions/types';
const useStyles = makeStyles(theme => ({
    dialogWrapper: {
        padding: theme.spacing(2),
        position: 'absolute',
        top: theme.spacing(5)
    },
    dialogTitle: {
        paddingRight: '0px'
    }
}))

export default function Popup({ title, children} ) {
const dispatcher = useDispatch()
    const openPopup = useSelector(({taskManager}) => taskManager.openPopup);
    const classes = useStyles();

    return (
        <Dialog open={openPopup} maxWidth="md" classes={{ paper: classes.dialogWrapper }}>
            <DialogTitle className={classes.dialogTitle}>
                <div style={{ display: 'flex' }}>
                    <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                        {title}
                    </Typography>
                    <Controls.ActionButton
                        color="secondary"
                        onClick={()=>{
                            dispatcher({
                            type:"openPopup",
                            payload:false
                        })
                    }}>
                        <CloseIcon  onClick={()=>dispatcher({
                            type:RESET_FORM_VALUES,
                           
                        })}/>
                    </Controls.ActionButton>
                </div>
            </DialogTitle>
            <DialogContent dividers>
                {children}
            </DialogContent>
        </Dialog>
    )
}

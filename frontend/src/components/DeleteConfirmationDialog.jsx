import React, {useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useDispatch} from "react-redux";
import {deleteSingleData} from "../features/employeeSlice";

export default function DeleteConfirmationDialog({
                                                     deleteEmployeeId,
                                                     openDeleteConfirmDialog,
                                                     setOpenDeleteConfirmDialog
                                                 }) {

    const dispatch = useDispatch();

    const handleClose = () => {
        setOpenDeleteConfirmDialog(false);
    };

    const handleDeleteConfirmBtn = () => {
        // console.log("EmployeeID : ", deleteEmployeeId);
        dispatch(deleteSingleData(deleteEmployeeId));
        setOpenDeleteConfirmDialog(false);
    }

    return (<div>
        <Dialog
            open={openDeleteConfirmDialog}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                Are you sure want to delete ?
            </DialogTitle>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleDeleteConfirmBtn} autoFocus>
                    Continue
                </Button>
            </DialogActions>
        </Dialog>
    </div>);
}
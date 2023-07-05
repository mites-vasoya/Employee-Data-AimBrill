import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useEffect, useState} from "react";
import "./EditEmployeeDataDialog.css"
import {useDispatch} from "react-redux";
import {updateData} from "../features/employeeSlice";

export default function EditEmployeeDataDialog({
                                                   editEmployeeData,
                                                   setEditEmployeeData,
                                                   openEditConfirmDialog,
                                                   setOpenEditConfirmDialog
                                               }) {

    const dispatch = useDispatch();

    // useEffect(() => {
    //     console.log("USE EFFECT : ", editEmployeeData);
    // }, [editEmployeeData]);

    const handleClickOpen = () => {
        setOpenEditConfirmDialog(true);
    };

    const handleClose = () => {
        setOpenEditConfirmDialog(false);
    };

    const handleChanges = (e) => {
        setEditEmployeeData((prevState) => ({
            ...prevState, [e.target.name]: e.target.value,
        }));
    };

    const handleUpdateBtn = () => {
        setOpenEditConfirmDialog(false);
        dispatch(updateData(editEmployeeData));
    }

    return (<div>
        <Dialog open={openEditConfirmDialog} onClose={handleClose}>
            <DialogTitle>Edit Employee Data</DialogTitle>
            <DialogContent>
                <div className="editDataForm">
                    <div>
                        <TextField
                            autoFocus
                            sx={{
                                width: "48%"
                            }}
                            margin="dense"
                            label="Employee ID"
                            type="text"
                            fullWidth
                            variant="standard"
                            aria-readonly={true}
                            value={editEmployeeData.EmployeeID}
                        />
                        <TextField
                            autoFocus
                            sx={{
                                width: "48%"
                            }}
                            margin="dense"
                            label="Employee Name"
                            type="text"
                            fullWidth
                            variant="standard"
                            name="EmployeeName"
                            onChange={handleChanges}
                            value={editEmployeeData.EmployeeName}
                        />
                    </div>
                    <div>
                        <TextField
                            autoFocus
                            sx={{
                                width: "48%"
                            }}
                            margin="dense"
                            label="Employee Status"
                            type="text"
                            fullWidth
                            variant="standard"
                            name="EmployeeStatus"
                            onChange={handleChanges}
                            value={editEmployeeData.EmployeeStatus}
                        />
                        <TextField
                            autoFocus
                            sx={{
                                width: "48%"
                            }}
                            margin="dense"
                            label="Joining Date"
                            type="text"
                            fullWidth
                            variant="standard"
                            name="JoiningDate"
                            aria-readonly={true}
                            value={editEmployeeData.JoiningDate}
                        />
                    </div>
                    <div>
                        <TextField
                            autoFocus
                            sx={{
                                width: "48%"
                            }}
                            margin="dense"
                            label="Birthdate"
                            type="text"
                            fullWidth
                            variant="standard"
                            name="BirthDate"
                            aria-readonly={true}
                            value={editEmployeeData.BirthDate}
                        />
                        <TextField
                            autoFocus
                            sx={{
                                width: "48%"
                            }}
                            margin="dense"
                            label="Skills"
                            type="text"
                            fullWidth
                            variant="standard"
                            name="Skills"
                            onChange={handleChanges}
                            value={editEmployeeData.Skills}
                        />
                    </div>
                    <div>
                        <TextField
                            autoFocus
                            sx={{
                                width: "48%"
                            }}
                            margin="dense"
                            label="Salary Details (In INR/Months)"
                            type="text"
                            fullWidth
                            variant="standard"
                            name="SalaryDetails"
                            onChange={handleChanges}
                            value={editEmployeeData.SalaryDetails}
                        />
                        <TextField
                            autoFocus
                            sx={{
                                width: "48%"
                            }}
                            margin="dense"
                            label="Address"
                            type="text"
                            fullWidth
                            variant="standard"
                            name="Address"
                            onChange={handleChanges}
                            value={editEmployeeData.Address}
                        />
                    </div>
                </div>

            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleUpdateBtn}>Update</Button>
            </DialogActions>
        </Dialog>
    </div>);
}
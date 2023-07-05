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
import {addNewData, updateData} from "../features/employeeSlice";

export default function AddNewEmployeeData({newEmployeeData, setNewEmployeeData, openAddNewData, setOpenAddNewData}) {

    const dispatch = useDispatch();

    useEffect(() => {
        console.log("USE EFFECT : ", newEmployeeData);
    }, [newEmployeeData]);

    const handleClickOpen = () => {
        setOpenAddNewData(true);
    };

    const handleClose = () => {
        setOpenAddNewData(false);
    };

    const handleChanges = (e) => {
        setNewEmployeeData((prevState) => ({
            ...prevState, [e.target.name]: e.target.value,
        }));
    };

    const handleAddBtn = () => {
        if (newEmployeeData.EmployeeName.trim() !== "" || newEmployeeData.SalaryDetails.trim() !== "" || newEmployeeData.BirthDate.trim() !== "" || newEmployeeData.Skills.trim() !== "" || newEmployeeData.Address.trim() !== "" || newEmployeeData.JoiningDate.trim() !== "" || newEmployeeData.EmployeeStatus.trim() !== "") {
            setOpenAddNewData(false);
            dispatch(addNewData(newEmployeeData));
        } else {
            alert()
        }

    }

    return (<div>
        <Dialog open={setOpenAddNewData} onClose={handleClose}>
            <DialogTitle>Edit Employee Data</DialogTitle>
            <DialogContent>
                <div className="editDataForm">
                    <div>
                        <TextField
                            autoFocus
                            sx={{
                                width: "100%", margin: "dense"
                            }}
                            label="Employee Name"
                            type="text"
                            fullWidth
                            variant="standard"
                            name="EmployeeName"
                            onChange={handleChanges}
                            value={newEmployeeData.EmployeeName}
                            required={true}
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
                            value={newEmployeeData.EmployeeStatus}
                            required={true}
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
                            value={newEmployeeData.Skills}
                            required={true}
                        />

                    </div>
                    <div>
                        <TextField
                            autoFocus
                            sx={{
                                width: "48%"
                            }}
                            margin="dense"
                            label="Birthdate (dd/mm/yyyy)"
                            type="text"
                            fullWidth
                            variant="standard"
                            name="BirthDate"
                            onChange={handleChanges}
                            value={newEmployeeData.BirthDate}
                            required={true}
                        />
                        <TextField
                            autoFocus
                            sx={{
                                width: "48%"
                            }}
                            margin="dense"
                            label="Joining Date (dd/mm/yyyy)"
                            type="text"
                            fullWidth
                            variant="standard"
                            name="JoiningDate"
                            onChange={handleChanges}
                            value={newEmployeeData.JoiningDate}
                            required={true}
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
                            value={newEmployeeData.SalaryDetails}
                            required={true}
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
                            value={newEmployeeData.Address}
                            required={true}
                        />
                    </div>
                </div>

            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleAddBtn}>Add</Button>
            </DialogActions>
        </Dialog>
    </div>);
}
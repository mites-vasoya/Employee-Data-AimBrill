import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import "./ChartDialog.css";

import {Chart} from "react-google-charts";


//Function to calculate Employement Type from Employee Data Array
const countEmployeeTypes = (employees) => {
    let count = {
        "Full-Time": 0, "Part-Time": 0, "Contract": 0
    };

    console.log("DATA PASSED : ", employees);

    employees.forEach(employee => {
        switch (employee.EmployeeStatus) {
            case "Full-Time":
                count["Full-Time"]++;
                break;
            case "Part-Time":
                count["Part-Time"]++;
                break;
            case "Contract":
                count["Contract"]++;
                break;
            default:
                break;
        }
    });

    let result = [["Employment Type", "Number"]];
    Object.keys(count).forEach(type => {
        result.push([type, count[type]]);
    });

    console.log("CALC : ", result);

    return result;
}

const countSalaryNumbers = (employees) => {
    let count = {
        "<40000": 0, "40000-55000": 0, "55001-75000": 0, "75001>": 0
    };

    employees.forEach(employee => {
        switch (true) {
            case employee.SalaryDetails < 40000:
                count["<40000"]++;
                break;
            case employee.SalaryDetails >= 40000 && employee.SalaryDetails <= 55000:
                count["40000-55000"]++;
                break;
            case employee.SalaryDetails > 55000 && employee.SalaryDetails <= 75000:
                count["55001-75000"]++;
                break;
            case employee.SalaryDetails > 75000:
                count["75001>"]++;
                break;
            default:
                break;
        }
    });

    let result = [["Salary", "Numbers Of Employee"]];
    Object.keys(count).forEach(type => {
        result.push([type, count[type]]);
    });

    return result;
}

export default function ChartDialog({employeeData, openChartDialog, setOpenChartDialog}) {

    //Data to used in the Pie Chart of Employement Type
    const pieChartData = countEmployeeTypes(employeeData);
    const pieChartOptions = {
        legend: {
            position: 'bottom',
        }, title: "", is3D: true,
    };

    //Data to used in the Line Chart of Employement Type
    const barChartData = countSalaryNumbers(employeeData);
    const barChartOptions = {
        legend: {
            position: 'bottom' // Set the legend position to 'bottom'
        }
    };

    const options = {
        legend: {
            position: "none"
        }
    };


    const handleClickOpen = () => {
        setOpenChartDialog(true);
    };

    const handleClose = () => {
        setOpenChartDialog(false);
    };

    return (<div>
        <Dialog
            open={openChartDialog}
            fullWidth={true}
            maxWidth="xl"
            PaperProps={{
                sx: {
                    height: "90%",
                }
            }}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="chat-dialog-title">
                <p>
                    Chart Analysis
                </p>
            </DialogTitle>
            <DialogContent>
                <div className="chartContainer">
                    <div className="employeentTypeChart">
                        <div className="title">
                            Employement Type
                        </div>
                        <Chart
                            chartType="PieChart"
                            data={pieChartData}
                            options={pieChartOptions}
                            width={"100%"}
                            height={"95%"}
                            style={{boxSizing: "border-box"}}
                        />
                    </div>
                    <div className="employeeSalaryChart">
                        <div className="title">
                            Salary
                        </div>
                        <Chart
                            chartType="Bar"
                            data={barChartData}
                            options={options}
                            width={"97%"}
                            height={"95%"}
                            style={{boxSizing: "border-box", padding: "10px", margin: "20px auto 0 auto"}}
                        />
                    </div>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} autoFocus>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    </div>);
}
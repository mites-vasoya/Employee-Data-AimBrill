import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import EmployeesDataTable from "./components/EmployeesDataTable";
import {Button} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import Footer from "./components/Footer";
import FileImportDialog from "./components/FileImportDialog";
import './App.css';
import DeleteConfirmationDialog from "./components/DeleteConfirmationDialog";
import AddNewEmployeeData from "./components/AddNewEmployeeData";
import IconButton from "@mui/material/IconButton";

function App() {
    const [openImportFile, setOpenImportFile] = useState(false);
    const [openAddNewData, setOpenAddNewData] = useState(false);
    const [newEmployeeData, setNewEmployeeData] = useState({
        EmployeeName: "", EmployeeStatus: "", JoiningDate: "", BirthDate: "", Skills: "", SalaryDetails: "", Address: ""
    });
    const [openChartDialog, setOpenChartDialog] = useState(false);
    
    const {employeeData, isImporting, isImported} = useSelector((state) => state.employeeOps);

    // useEffect(() => {
    //     console.log("TABLE DATA : ", employeeData);
    // }, [employeeData])

    const handleAddNewBtn = () => {
        setOpenAddNewData(true);
        console.log("ADDING NEW DATA__");
    }

    return (<>
        <div className="app">
            <div className="header">
                <p>AimBrill Employee Data</p>
            </div>
            <div className="tableDiv">
                <div className="headerDiv">
                    <Button variant="contained" sx={{backgroundColor: "black"}} startIcon={<AddIcon/>}
                            className="newDataBtn" onClick={handleAddNewBtn}> Add New
                        Data</Button>
                </div>
                <div className="tableItems">
                    {employeeData.length > 0 ? (<>
                        <div className="tableHeader">
                            <p>
                                Employee's Records
                            </p>
                            <div className="chartBtn">
                                <IconButton color="primary" size="large">
                                    <InsertChartIcon/>
                                </IconButton>
                            </div>
                        </div>
                    </>) : (<></>)}
                    <EmployeesDataTable employeeData={employeeData}/>
                </div>
            </div>
            {employeeData.length > 0 ? (<></>) : (<> <Footer openImportFile={openImportFile}
                                                             setOpenImportFile={setOpenImportFile}/></>)}

        </div>

        {openImportFile ? (<>
            <FileImportDialog openImportFile={openImportFile} setOpenImportFile={setOpenImportFile}/>
        </>) : (<></>)}

        {openAddNewData ? (<>
            <AddNewEmployeeData
                newEmployeeData={newEmployeeData}
                setNewEmployeeData={setNewEmployeeData}
                openAddNewData={openAddNewData}
                setOpenAddNewData={setOpenAddNewData}/>
        </>) : (<></>)}

    </>);
}

export default App;

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
import Footer from "./components/Footer";
import FileImportDialog from "./components/FileImportDialog";
import './App.css';

function App() {
    const [openImportFile, setOpenImportFile] = useState(false);


    const {employeeData, isImporting, isImported} = useSelector((state) => state.uploadFile);

    useEffect(() => {
        console.log("TABLE DATA : ", employeeData);
    }, [employeeData])


    return (<>
        <div className="app">
            <div className="header">
                <p>AimBrill Employee Data</p>
            </div>
            <div className="tableDiv">
                <div className="headerDiv">
                    <Button variant="contained" sx={{backgroundColor: "black"}} startIcon={<AddIcon/>}
                            className="newDataBtn"> Add New
                        Data</Button>
                </div>
                <EmployeesDataTable employeeData={employeeData}/>
            </div>
            <Footer openImportFile={openImportFile} setOpenImportFile={setOpenImportFile}/>
        </div>
        {openImportFile ? (<>
            <FileImportDialog openImportFile={openImportFile} setOpenImportFile={setOpenImportFile}/>
        </>) : (<></>)}
    </>);
}

export default App;

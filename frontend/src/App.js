import React from 'react';
import './App.css';
import EmployeesDataTable from "./components/EmployeesDataTable";
import {Button} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

function App() {
    return (
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
                <EmployeesDataTable/>
            </div>
            <div className="footer">
                
            </div>
        </div>
    );
}

export default App;

import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import {useEffect, useState} from "react";
import {Button, Checkbox} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import "./EmployeesDataTable.css"

let columns = [];

function createData(name, code, population, size) {
    const density = population / size;
    return {name, code, population, size, density};
}

export default function EmployeesDataTable({employeeData}) {

    const dispatch = useDispatch();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(50);
    const [selectedDataRow, setSelectedDataRow] = useState([])

    useEffect(() => {
        console.log("SELECTED ROW : ", selectedDataRow)
    }, [selectedDataRow])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const tableColumnsTemp = [];

    if (employeeData.length > 0) {
        const cols = Object.keys(employeeData[0])
        cols.map((col, i) => {
            const colObj = {id: col, label: col};
            // console.log("COLUMNS : ", colObj);
            tableColumnsTemp.push(colObj);
        })
        columns = tableColumnsTemp;
    } else {
    }

    const removeSelectedRow = (index) => {
        const updatedArray = selectedDataRow.filter((_, i) => i !== index);
        setSelectedDataRow(updatedArray);
    };

    const handleCheckBox = (row) => {
        if (selectedDataRow.includes(row.EmployeeID)) {
            const index = selectedDataRow.indexOf(row.EmployeeID);
            removeSelectedRow(index);
        } else {
            const updatedArray = [...selectedDataRow, row.EmployeeID];
            setSelectedDataRow(updatedArray);
        }
    }

    const handleMultipleDeleteBtn = () => {

    }

    return (
        <div className="tableContainer">
            {employeeData.length > 0 ? (<>
                <Paper className="table">
                    <TableContainer sx={{maxHeight: 440}}>
                        <Table stickyHeader aria-label="sticky table" size="normal">
                            <TableHead>

                                <TableRow>
                                    <TableCell padding="checkbox"></TableCell>
                                    {columns.map((column) => (<TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{minWidth: column.minWidth}}
                                    >
                                        {column.label}
                                    </TableCell>))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {employeeData
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row) => {
                                        return (<TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    color="primary"
                                                    onChange={() => handleCheckBox(row)}
                                                />
                                            </TableCell>
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                return (<TableCell key={row.EmployeeID} align={column.align}>
                                                    {column.format && typeof value === 'number' ? column.format(value) : value}
                                                </TableCell>);
                                            })}
                                        </TableRow>);
                                    })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[50, 100]}
                        component="div"
                        count={employeeData.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </>) : (<>
                <div className="noDataTitle">
                    No Data Found, Upload Excel
                </div>
            </>)}

            {
                selectedDataRow.length > 0 ? (<>
                    <div className="extraBtns">
                        <Button variant="contained" className="deleteBtn" onClick={handleMultipleDeleteBtn}
                                startIcon={<DeleteIcon/>}>Delete Data</Button>
                        <Button variant="outlined" className="cancelBtn">Cancel</Button>
                    </div>
                </>) : (<></>)
            }
        </div>
    );
}
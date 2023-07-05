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
import {Button, Checkbox, Switch} from "@mui/material";
import "./EmployeesDataTable.css"
import {deleteMultipleData} from "../features/employeeSlice";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import DeleteConfirmationDialog from "./DeleteConfirmationDialog";
import EditEmployeeDataDialog from "./EditEmployeeDataDialog";

let columns = [];

function createData(name, code, population, size) {
    const density = population / size;
    return {name, code, population, size, density};
}

export default function EmployeesDataTable({employeeData}) {

    const dispatch = useDispatch();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(50);
    const [selectedDataRow, setSelectedDataRow] = useState([]);
    const [deleteEmployeeId, setDeleteEmployeeId] = useState();
    const [editEmployeeId, setEditEmployeeId] = useState();
    const [editEmployeeData, setEditEmployeeData] = useState({});
    const [openDeleteConfirmDialog, setOpenDeleteConfirmDialog] = useState(false);
    const [openEditConfirmDialog, setOpenEditConfirmDialog] = useState(false);
    const [tableDensity, setTableDensity] = useState(false);

    const {isDeleted} = useSelector((state) => state.employeeOps);

    useEffect(() => {
        for (let i = 0; i < employeeData.length; i++) {
            if (employeeData[i].EmployeeID === editEmployeeId) {
                setEditEmployeeData(employeeData[i]);
                break;
            }
        }
    }, [editEmployeeId]);

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
            tableColumnsTemp.push(colObj);
        });
        tableColumnsTemp.push({id: "singleDeleteBtn", label: "Delete"}, {id: "editDataBtn", label: "Edit"})
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
        dispatch(deleteMultipleData(selectedDataRow));
    }

    const handleDeleteConfirmation = (employeeID) => {
        setOpenDeleteConfirmDialog(!openDeleteConfirmDialog);
        setDeleteEmployeeId(employeeID);
    }

    const handleEditConfirmation = (employeeID) => {
        setOpenEditConfirmDialog(!openEditConfirmDialog);
        setEditEmployeeId(employeeID);
    }

    const handleChangeDense = () => {
        setTableDensity(!tableDensity);
    }

    return (<div className="tableContainer">
        {employeeData.length > 0 ? (<>
            <Paper className="table">
                <TableContainer sx={{maxHeight: 440}}>
                    <Table stickyHeader aria-label="sticky table" size={tableDensity ? "small" : "normal"}>
                        <TableHead>
                            <TableRow>
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
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (<TableCell key={column.id} align={column.align}>
                                                {column.id === "singleDeleteBtn" ? (<><IconButton
                                                    aria-label="delete"
                                                    onClick={() => handleDeleteConfirmation(row.EmployeeID)}>
                                                    <DeleteIcon/>
                                                </IconButton></>) : column.id === "editDataBtn" ? (<>
                                                    <IconButton aria-label="edit"
                                                                onClick={() => handleEditConfirmation(row.EmployeeID)}>
                                                        <EditIcon/>
                                                    </IconButton>
                                                </>) : (<>{value}</>)}
                                            </TableCell>);
                                        })}
                                    </TableRow>);
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <div className="pagination-dense-btn">
                    <Switch checked={tableDensity} onChange={handleChangeDense} className="densitySwitch"/>
                    <TablePagination
                        rowsPerPageOptions={[50, 100]}
                        component="div"
                        className="tablePagination"
                        count={employeeData.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </div>

            </Paper>
        </>) : (<>
            <div className="noDataTitle">
                No Data Found, Upload Excel
            </div>
        </>)}

        {selectedDataRow.length > 0 ? (<>
            <div className="extraBtns">
                <Button variant="contained" className="deleteBtn" onClick={handleMultipleDeleteBtn}
                        startIcon={<DeleteIcon/>}>Delete Data</Button>
            </div>
        </>) : (<></>)}

        {openDeleteConfirmDialog ? (<>
            <DeleteConfirmationDialog
                deleteEmployeeId={deleteEmployeeId}
                openDeleteConfirmDialog={openDeleteConfirmDialog}
                setOpenDeleteConfirmDialog={setOpenDeleteConfirmDialog}
            />
        </>) : (<></>)}
        {openEditConfirmDialog ? (<>
            <EditEmployeeDataDialog
                editEmployeeData={editEmployeeData}
                setEditEmployeeData={setEditEmployeeData}
                openEditConfirmDialog={openEditConfirmDialog}
                setOpenEditConfirmDialog={setOpenEditConfirmDialog}
            />
        </>) : (<></>)}
    </div>);
}
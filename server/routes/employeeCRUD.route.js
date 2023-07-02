const express = require("express");
const router = express.Router();

const {
    editEmployeeData, deleteEmployeeData, insertNewEmployeeData,
} = require("../crud_ops/crudOPS.controller")

const {generateRandomNumber} = require("../functions/functions");


//Insert New Employee
router.post("/add", async (req, res) => {
    const {...fields} = req.body;
    const tableName = 'employee_data';

    const employeeID = generateRandomNumber();

    //Add randomaly generated 'employeeid' to body data
    fields.employeeid = employeeID;

    const columns = Object.keys(fields);
    const columnNames = columns.join(', ');
    const queryValues = Object.values(fields);
    const valuePlaceholders = queryValues.map((value, index) => `$${index + 1}`).join(', ');

    //Insert new user data
    const insertResponse = await insertNewEmployeeData(employeeID, tableName, columnNames, queryValues, valuePlaceholders);

    res.status(200).json({data: insertResponse.addedEmployee, message: insertResponse.message});
})

//Edit Employee Data
router.put("/edit/:id", async (req, res) => {
    const employeeID = req.params.id;
    const {...fields} = req.body;

    const tableName = 'employee_data';
    const newData = [employeeID, "ReactJS"];

    const setClause = Object.keys(fields)
        .map((key, index) => `${key} = $${index + 1}`)
        .join(', ');

    const values = Object.values(fields);

    const updateResponse = await editEmployeeData(employeeID, tableName, setClause, values);

    res.status(200).json({newData: updateResponse.newData, message: updateResponse.message})
});

//Delete Employee Data
router.delete("/delete/:id", async (req, res) => {
    const employeeID = req.params.id;
    const tableName = "employee_data"

    const deleteResponse = await deleteEmployeeData(tableName, employeeID);
    res.status(200).json({message: deleteResponse.message})
})

module.exports = router;
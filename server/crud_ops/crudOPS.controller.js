const pool = require("../db/db");
const {values} = require("pg/lib/native/query");

const insertImportedFileData = (excelParsedData, tableName) => {

    const columnNames = Object.keys(excelParsedData[0]);

    //Half Insert Query
    const insertQuery = `INSERT INTO ${tableName} (${columnNames.join(', ')}) VALUES`;

    // Generate the values placeholders for prepared statement
    const valuePlaceholders = columnNames.map((_, index) => `$${index + 1}`);

    // Construct the full insert query
    const fullInsertQuery = `${insertQuery} (${valuePlaceholders.join(', ')})`;

    // Execute the insert queries for each row of data
    excelParsedData.forEach(async (row) => {
        const values = columnNames.map((columnName) => row[columnName]);

        await pool.query(fullInsertQuery, values, (err, result) => {
            if (err) {
                console.error('Error inserting data:', err);
                return;
            }
            console.log('Data inserted successfully');
        });
    });
    // Release the client back to the pool
    // done();
};

const insertNewEmployeeData = async (employeeID, tableName, columnNames, queryValues, valuePlaceholders) => {
    const insertQuery = `INSERT INTO ${tableName} (${columnNames}) VALUES (${valuePlaceholders})`;

    const insertData = await pool.query(insertQuery, queryValues);

    //
    if (insertData.rowCount !== 0) {
        const findQuery = `SELECT * FROM ${tableName} WHERE employeeid = $1`;
        const employeeIdData = [employeeID]
        const findEmployee = await pool.query(findQuery, employeeIdData);
        console.log("INSERT DATA : ", findEmployee.rows[0]);
        const message = "New Employee Data Inserted...";
        return {message, addedEmployee: findEmployee.rows[0]};
    } else {
        const message = "Can't add employee data...";
        return {message};
    }
}

const editEmployeeData = async (employeeID, tableName, setClause, values) => {
    const findQuery = `
    SELECT * FROM ${tableName}
    WHERE
    employeeid = $1`;
    const employeeIdData = [values[0]]
    const findEmployee = await pool.query(findQuery, employeeIdData);

    if (findEmployee.rowCount !== 0) {
        const updateQuery = `UPDATE ${tableName} SET ${setClause} WHERE employeeid = $1;`;

        const editData = await pool.query(updateQuery, values);
        const message = "Employee Data updated...";
        const findEmployeeNewData = await pool.query(findQuery, employeeIdData);
        return {message, newData: findEmployeeNewData.rows[0]}
    } else {
        const message = "Employee with given EmployeeID not found...";
        return {message};
    }
}

const deleteEmployeeData = async (tableName, employeeID) => {

    const findQuery = `
    SELECT * FROM ${tableName}
    WHERE
    employeeid = $1`;

    const employeeIdData = [employeeID]
    const findEmployee = await pool.query(findQuery, employeeIdData);

    if (findEmployee.rowCount !== 0) {
        const deleteQuery = `
    DELETE
    FROM ${tableName}
    WHERE
    employeeid = $1;
    `

        const deleteData = await pool.query(deleteQuery, employeeIdData);
        const message = "Employee Data Deleted...";
        return {message}
    } else {
        const message = "Employee with given EmployeeID not found...";
        return {message};
    }

    console.log("EMPLOYEE ID : ", findEmployee);
}


module.exports = {insertImportedFileData, editEmployeeData, deleteEmployeeData, insertNewEmployeeData};
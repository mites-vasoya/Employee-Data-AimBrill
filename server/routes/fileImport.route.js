const express = require("express");
const router = express.Router();
const {readExcelController} = require("../controller/readExcel.controller")

//File uploading using multer
const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/') // Destination folder for uploaded files
    }, filename: function (req, file, cb) {
        cb(null, file.originalname) // File naming strategy
    }
});
const upload = multer({storage: storage});
const pool = require("../db/db");
const {insertImportedFileData} = require("../crud_ops/crudOPS.controller");


///Function to check Table Existence
const checkTableExistence = async (tableName) => {
    const query = `
    SELECT EXISTS (
      SELECT 1
      FROM pg_tables
      WHERE tablename = $1
    );
  `;

    const result = await pool.query(query, [tableName]);
    const exists = result.rows[0].exists;

    return exists;
}

const deleteExistingTable = async (tableName) => {
    const query = `DROP TABLE IF EXISTS ${tableName}`;
    await pool.query(query);
}


//File Import Route
router.post("/import", upload.single('importedFile'), async (req, res) => {
    const importedFile = req.file;
    console.log("IMPORTED FILE DATA : ", importedFile)

    //Read Data from the excel file
    const excelParsedData = readExcelController(importedFile.path);
    const tableName = 'employee_data';
    const columnNames = Object.keys(excelParsedData[0]);

    //Convert Column Name into lowercase
    columnNames.map((columnName, i) => {
        columnNames[i] = columnName.toLowerCase();
    });

    //Check whether table is already present in the Database or not
    const tableExists = await checkTableExistence(tableName);

    if (tableExists) {
        await deleteExistingTable(tableName);
    }

    //Query to create new table
    const createTableQuery = `CREATE TABLE ${tableName} (${columnNames.map(name => `"${name}" TEXT`).join(', ')})`;

    //Create table and insert data
    const createTable = await pool.query(createTableQuery, (err, result) => {
        if (err) {
            console.error('Error creating table', err);
            return;
        } else {
            insertImportedFileData(excelParsedData, tableName);
        }
    });

    //Fetch Data from the Database


    console.log("IMPORTED FILE : ", importedFile);
    //Return response to the client
    res.status(200).json(excelParsedData);
});

module.exports = router;
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
const {insertImportedFileData} = require("../crud_ops/crud_ops");


//File import route
router.post("/import", upload.single('file'), async (req, res) => {
    const importedFile = req.file;

    //Read Data from the excel file
    const excelParsedData = readExcelController(importedFile.path);
    const tableName = 'employee_data';
    const columnNames = Object.keys(excelParsedData[0]);

    //Convert Column Name into lowercase
    columnNames.map((columnName, i) => {
        columnNames[i] = columnName.toLowerCase();
    })

    //Query to create new table
    const createTableQuery = `CREATE TABLE ${tableName} (${columnNames.map(name => `"${name}" TEXT`).join(', ')})`;

    //Create table and insert data
    const createTable = await pool.query(createTableQuery, (err, result) => {
        if (err) {
            console.error('Error creating table', err);
            return;
        } else {
            console.log('Table created successfully');
            insertImportedFileData(excelParsedData, tableName);
        }
    });

    //Return response to the client
    res.status(200).json(importedFile);
});


module.exports = router;
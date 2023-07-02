const pool = require("../db/db");

const insertImportedFileData = (excelParsedData, tableName) => {

    const columnNames = Object.keys(excelParsedData[0]);

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
                console.error('Error inserting data:', err, "\n Insert Query : ", columnNames);
                return;
            }

            console.log('Data inserted successfully');
        });
    });

    // Release the client back to the pool
    // done();
};

module.exports = {insertImportedFileData};
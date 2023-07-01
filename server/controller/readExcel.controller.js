const xlsx = require("xlsx");

//Read data from the file
const readExcelController = (fileName) => {
    const workbook = xlsx.readFile(fileName);
    let workbook_sheet = workbook.SheetNames;
    let workbook_response = xlsx.utils.sheet_to_json(workbook.Sheets[workbook_sheet[0]]);

    //Return file read data
    return workbook_response;
}

module.exports = {readExcelController}
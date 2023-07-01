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


//File import route
router.post("/import", upload.single('file'), (req, res) => {
    const importedFile = req.file;
    console.log("IMPORTED FILES : ", importedFile);

    const sheetResponse = readExcelController(importedFile.path);

    console.log("FILE DATA : ", sheetResponse)

    res.status(200).json(importedFile);
});

module.exports = router;
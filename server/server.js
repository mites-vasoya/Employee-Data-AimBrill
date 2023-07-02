const express = require("express");
const app = express();

const fileImportRoute = require("./routes/fileImport.route");
const employeeCRUDRoute = require("./routes/employeeCRUD.route")

require("dotenv").config();

const PORT = process.env.SERVER_PORT || 8888;

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use("/file", fileImportRoute);
app.use("/employee", employeeCRUDRoute);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
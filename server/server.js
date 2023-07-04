const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

const fileImportRoute = require("./routes/fileImport.route");
const employeeCRUDRoute = require("./routes/employeeCRUD.route")

require("dotenv").config();

const PORT = process.env.SERVER_PORT || 8888;

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use("/file", fileImportRoute);
app.use("/employee", employeeCRUDRoute);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
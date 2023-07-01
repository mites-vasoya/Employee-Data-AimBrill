const express = require("express");
const app = express();

const fileImport = require("./routes/fileImport.route");

require("dotenv").config();

const PORT = process.env.SERVER_PORT || 8888;

app.use("/file", fileImport);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
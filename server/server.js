const express = require("express");
const app = express();

require("dotenv").config();

const PORT = process.env.SERVER_PORT || 8888

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
const express = require("express");
const app = express();

require("dotenv").config();

PORT = process.env.SERVER_PORT || 8888;

app.listen(PORT, () => {
    console.log(`Server is Running on http://localhost:${PORT}`);
})
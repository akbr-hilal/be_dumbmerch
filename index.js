// Import Express
const express = require("express");

require("dotenv").config();

// import router
const router = require("./src/routes/routes");

const app = express();

const port = 5050;

app.use(express.json());

// add end point & router
app.use("/api/v1", router);
app.use("/uploads", express.static("uploads"));

app.listen(port, () => console.log(`Server Run on port ${port}`));

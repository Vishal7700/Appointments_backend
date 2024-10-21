const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const DBconnection = require("./config/connection")
const adminRouter = require("./routes/adminRouter")
const swaggerUi = require('swagger-ui-express');
const path = require("path");


const app = express();
require("dotenv").config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use("/admin", adminRouter);
const swaggerDocs = require('./config/swaggerOptions'); 
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


try {
    const PORT = process.env.PORT;
    const HOST = process.env.HOST;
    app.listen(PORT, HOST , () => {
        console.log(`Server running on port ${PORT} ${HOST}`);
    });
} catch (error) {
    console.error(error.message);
}
require("dotenv").config();
const express = require("express");
const bookRoutes = require("./routers/bookRoutes");
const { setDatabase } = require("./controllers/bookController");
const connectDB = require("./models/db");

const app = express()
app.use(express.json());
app.use("/api", bookRoutes);

let PORT = process.env.PORT || 3005;

const initializeDBAndServer = async () => {
    try {
        const db = await connectDB();
        setDatabase(db);
        console.log("Database connected successfully.");
        app.listen(PORT, () => {
            console.log(`server running at ${PORT}`);
        })
    } catch (error) {
        console.log(`DB ERROR: ${error.message}`)
        process.exit(1);
    }

}

initializeDBAndServer();


module.exports = app
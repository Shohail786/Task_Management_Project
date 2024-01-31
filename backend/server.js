const express = require("express");
const app = express();
const port = 5001;
const connectDb = require("./config/databaseConnect");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const errorHandler = require("./middleware/errorHandler");
const cors = require("cors");
connectDb();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

const user = require("./routes/userRoutes");
app.use("/user", user);
const task = require("./routes/taskRoutes");
app.use("/tasks", task);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});

module.exports = app;

const express = require('express')
const app = express();

const userController = require("./Controller/usersController")
const employeeController = require("./Controller/employeeController")
const permissionsController = require("./Controller/permissionsController")
const departmentController = require("./Controller/departmentController")
const shiftController = require("./Controller/shiftController")
const shiftToEmpController = require("./Controller/shiftToEmpController")

const authController = require("./Controller/authController")


require('./config/database')
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true })).use(bodyParser.json());
var cors = require("cors");
app.use(cors());

app.use("/api/users",userController);
app.use("/api/employees",employeeController);
app.use("/api/permissions",permissionsController);
app.use("/api/departments",departmentController);
app.use("/api/shifts",shiftController);
app.use("/api/employeeShifts",shiftToEmpController);

app.use("/api/auth",authController);


app.listen(5000, () => {
    console.log("Server run at port 5000 !")
})

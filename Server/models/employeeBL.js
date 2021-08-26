const employeeModel = require('./employeeModel')

exports.GetAllEmployees = function()
{
    return new Promise((resolve,reject)=>
    {
        employeeModel.find({},function(err,data)
        {
            if(err)
            {
                reject(err)
            }
            else
            {
                resolve(data)
            }
        })
    })
}
exports.GetEmployeeByID = function(employeeID)
{
    return new Promise((resolve,reject)=>
    {
        employeeModel.findById(employeeID,function(err,data)
        {
            if(err)
            {
                reject(err)
            }
            else
            {
                resolve(data)
                
            }
        })
    })
}
exports.UpdateEmployee = function(employeeID,newEmployeeData)
{
    return new Promise((resolve,reject)=>
    {
        employeeModel.findByIdAndUpdate(employeeID,newEmployeeData,function(err,data)
        {
            if(err)
            {
                reject(err);
            }
            else
            {   
                resolve("Employee Was Updated");
            }
        })
    })
}
exports.AddEmployee = function(newEmployeeData)
{
    return new Promise((resolve,reject)=>
    {
        let newEmployee = new employeeModel({
            firstName : newEmployeeData.firstName,
            lastName : newEmployeeData.lastName,
            startWorkYear : newEmployeeData.startWorkYear,
            department : newEmployeeData.department
        })
        newEmployee.save(function(err){
            if(err)
            {
                resolve(err)
            }
            else
            {
                resolve('New Employee Was Created')
            }
        })       
    })
}
exports.DeleteEmployee = function(employeeID)
{
    return new Promise((resolve,reject)=>
    {
        employeeModel.findByIdAndDelete(employeeID,function(err,data)
        {
            if(err)
            {
                reject(err)
            }
            else
            {
                resolve("Employee Was Deleted")
                
            }
        })
    })
}
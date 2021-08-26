const departmentModel = require('./departmentModel')

exports.GetAllDepartments = function()
{
    return new Promise((resolve,reject)=>
    {
        departmentModel.find({},function(err,data)
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
exports.GetDepartmentByID = function(departmentID)
{
    return new Promise((resolve,reject)=>
    {
        departmentModel.findById(departmentID,function(err,data)
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
exports.UpdateDepartment = function(departmentID,departmentNewData)
{
    return new Promise((resolve,reject)=>
    {
        departmentModel.findByIdAndUpdate(departmentID,departmentNewData,function(err,data)
        {
            if(err)
            {
                reject(err);
            }
            else
            {   
                resolve("Department Was Updated");
            }
        })
    })
}
exports.AddDepartment = function(departmentNewData)
{
    return new Promise((resolve,reject)=>
    {
        let newDepartment = new departmentModel({
            departmentName : departmentNewData.departmentName,
            departmentManagerID : departmentNewData.departmentManagerID,
        })
        newDepartment.save(function(err){
            if(err)
            {
                resolve(err)
            }
            else
            {
                resolve('New Department Was Created')
            }
        })       
    })
}
exports.DeleteDepartment = function(departmentID)
{
    return new Promise((resolve,reject)=>
    {
        departmentModel.findByIdAndDelete(departmentID,function(err,data)
        {
            if(err)
            {
                reject(err)
            }
            else
            {
                resolve("Department Was Deleted")
                
            }
        })
    })
}
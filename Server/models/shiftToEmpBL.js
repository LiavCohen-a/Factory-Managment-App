const shiftToEmpModel = require('./shiftToEmpModel')

exports.GetAllEmpShifts = function()
{
    return new Promise((resolve,reject)=>
    {
        shiftToEmpModel.find({},function(err,data)
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
exports.GetEmpShiftByID = function(shiftID)
{
    return new Promise((resolve,reject)=>
    {
        shiftToEmpModel.findById(shiftID,function(err,data)
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
exports.UpdateEmpShift = function(shiftID,shiftNewData)
{
    return new Promise((resolve,reject)=>
    {
        shiftToEmpModel.findByIdAndUpdate(shiftID,shiftNewData,function(err,data)
        {
            if(err)
            {
                reject(err);
            }
            else
            {   
                resolve("Shift To Employee Was Updated");
            }
        })
    })
}
exports.AddShift = function(shiftNewData)
{
    return new Promise((resolve,reject)=>
    {
        let newShift = new shiftToEmpModel({
            shiftID : shiftNewData.shiftID,
            employeeID : shiftNewData.employeeID,
        })
        newShift.save(function(err){
            if(err)
            {
                resolve(err)
            }
            else
            {
                resolve('New Shift To Employee Was Created')
            }
        })       
    })
}
exports.DeleteShift = function(shiftID)
{
    return new Promise((resolve,reject)=>
    {
        shiftToEmpModel.findByIdAndDelete(shiftID,function(err,data)
        {
            if(err)
            {
                reject(err)
            }
            else
            {
                resolve("Shift To Employee Was Deleted")
                
            }
        })
    })
}
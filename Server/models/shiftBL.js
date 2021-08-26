const shiftModel = require('./shiftModel')

exports.GetAllShifts = function()
{
    return new Promise((resolve,reject)=>
    {
        shiftModel.find({},function(err,data)
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
exports.GetShiftByID = function(shiftID)
{
    return new Promise((resolve,reject)=>
    {
        shiftModel.findById(shiftID,function(err,data)
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
exports.UpdateShift = function(shiftID,shiftNewData)
{
    return new Promise((resolve,reject)=>
    {
        shiftModel.findByIdAndUpdate(shiftID,shiftNewData,function(err,data)
        {
            if(err)
            {
                reject(err);
            }
            else
            {   
                resolve("Shift Was Updated");
            }
        })
    })
}
exports.AddShift = function(shiftNewData)
{
    return new Promise((resolve,reject)=>
    {
        let newShift = new shiftModel({
            date : shiftNewData.date,
            startTime : shiftNewData.startTime,
            endTime : shiftNewData.endTime,
        })
        newShift.save(function(err){
            if(err)
            {
                resolve(err)
            }
            else
            {
                resolve('New Shift Was Created')
            }
        })       
    })
}
exports.DeleteShift = function(shiftID)
{
    return new Promise((resolve,reject)=>
    {
        shiftModel.findByIdAndDelete(shiftID,function(err,data)
        {
            if(err)
            {
                reject(err)
            }
            else
            {
                resolve("Shift Was Deleted")
                
            }
        })
    })
}
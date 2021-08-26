const permissionsModel = require('./permissionsModel')

exports.GetAllPermissions = function()
{
    return new Promise((resolve,reject)=>
    {
        permissionsModel.find({},function(err,data)
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
exports.GetPermissionByID = function(permissionID)
{
    return new Promise((resolve,reject)=>
    {
        permissionsModel.findById(permissionID,function(err,data)
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
exports.UpdateUser = function(permissionID,PerNewData)
{
    return new Promise((resolve,reject)=>
    {
        permissionsModel.findByIdAndUpdate(permissionID,PerNewData,function(err,data)
        {
            if(err)
            {
                reject(err);
            }
            else
            {   
                resolve("Permission Was Updated");
            }
        })
    })
}
exports.AddPermission = function(PerNewData)
{
    return new Promise((resolve,reject)=>
    {
        let newPer = new permissionsModel({
            permissionName : PerNewData.permissionName,
        })
        newPer.save(function(err){
            if(err)
            {
                resolve(err)
            }
            else
            {
                resolve('New Permission Was Created')
            }
        })       
    })
}
exports.DeletePermission = function(permissionID)
{
    return new Promise((resolve,reject)=>
    {
        permissionsModel.findByIdAndDelete(permissionID,function(err,data)
        {
            if(err)
            {
                reject(err)
            }
            else
            {
                resolve("Permission Was Deleted")
                
            }
        })
    })
}
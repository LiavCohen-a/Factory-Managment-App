const usersModel = require('./userModel')

exports.GetAllUsers = function()
{
    return new Promise((resolve,reject)=>
    {
        usersModel.find({},function(err,data)
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
exports.GetUserByID = function(UserID)
{
    return new Promise((resolve,reject)=>
    {
        usersModel.findById(UserID,function(err,data)
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
exports.UpdateUser = function(UserID,UserNewData)
{
    return new Promise((resolve,reject)=>
    {
        usersModel.findByIdAndUpdate(UserID,UserNewData,function(err,data)
        {
            if(err)
            {
                reject(err);
            }
            else
            {   
                resolve("User Was Updated");
            }
        })
    })
}
exports.AddUser = function(newUserData)
{
    return new Promise((resolve,reject)=>
    {
        let newUser = new usersModel({
            fullName : newUserData.fullName,
            userName : newUserData.userName,
            password : newUserData.password,
            permissions : newUserData.permissions,
            isAdmin : newUserData.isAdmin
        })
        newUser.save(function(err){
            if(err)
            {
                resolve(err)
            }
            else
            {
                resolve('New User Was Created')
            }
        })       
    })
}
exports.DeleteUser = function(UserID)
{
    return new Promise((resolve,reject)=>
    {
        usersModel.findByIdAndDelete(UserID,function(err,data)
        {
            if(err)
            {
                reject(err)
            }
            else
            {
                resolve("User Was Deleted")
                
            }
        })
    })
}



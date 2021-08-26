const userBL = require("./usersBL")
const jwt = require('jsonwebtoken')

exports.isUserExist =async function(userName,password)
{
   let users = await userBL.GetAllUsers();
   let index = users.findIndex(user => user.userName == userName && user.password == password )
   if(index >= 0)
   {
       return {isExist : true , userID : users[index]._id}
   }
   else{
       return {isExist : false , userID : null }
   }
   
}
exports.isAuth = function(jwtToken)  {
    console.log(jwtToken)
    if(!jwtToken)
    {
        console.log("is")
        return "No Token Provider !"
    }
    else{
      return  jwt.verify(jwtToken,"some key",async function(err,decoded){
            if(err)
            {
                console.log("false")

                return 'Failed To Authentication !'
            }
            else{
                console.log("true")
                console.log("true2")
                return true
            }
        })
    }
}

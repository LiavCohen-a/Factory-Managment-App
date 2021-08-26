const employeeBL = require('../models/employeeBL');

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')

router.route('/').get(async function(req,resp)
    {
        let jwtToken = req.headers.jwttoken;
        if(!jwtToken)
        {
            return resp.status(200).send({ auth : false , message : "No Token Provider !"})
        }
        else{
            jwt.verify(jwtToken,"some key",async function(err,decoded){
                if(err)
                {
                    return resp.status(200).send({auth : false , message : 'Failed To Authentication !'})
                }
                else{
                    let data = await employeeBL.GetAllEmployees()
                    return resp.status(200).send(data)
                }
            })
        }
    })
router.route('/:id').get(async function(req,resp)
    {
        let jwtToken = req.headers.jwttoken;
        if(!jwtToken)
        {
            return resp.status(200).send({ auth : false , message : "No Token Provider !"})
        }
        else{
            jwt.verify(jwtToken,"some key",async function(err,decoded){
                if(err)
                {
                    return resp.status(200).send({auth : false , message : 'Failed To Authentication !'})
                }
                else{
            
                    let userID = req.params.id;
                    let data = await employeeBL.GetEmployeeByID(userID)
                    return resp.status(200).send(data)
                }
            })
        }
    })
router.route('/').post(async function(req,resp)
    {
        let jwtToken = req.headers.jwttoken;
        if(!jwtToken)
        {
            return resp.status(200).send({ auth : false , message : "No Token Provider !"})
        }
        else{
            jwt.verify(jwtToken,"some key",async function(err,decoded){
                if(err)
                {
                    return resp.status(200).send({auth : false , message : 'Failed To Authentication !'})
                }
                else{
                    let newUserData = req.body;
                    let data = await employeeBL.AddEmployee(newUserData)
                    return resp.status(200).send(data)
                }
            })
        }
    })
router.route('/:id').put(async function(req,resp)
    {
        let jwtToken = req.headers.jwttoken;
        if(!jwtToken)
        {
            return resp.status(200).send({ auth : false , message : "No Token Provider !"})
        }
        else{
            jwt.verify(jwtToken,"some key",async function(err,decoded){
                if(err)
                {
                    return resp.status(200).send({auth : false , message : 'Failed To Authentication !'})
                }
                else{
                    let userID = req.params.id;
                    let newUserData = req.body;
                    let data = await employeeBL.UpdateEmployee(userID,newUserData)
                    return resp.status(200).send(data)
                }
            })
        }
    })
router.route('/:id').delete(async function(req,resp)
    {
        let jwtToken = req.headers.jwttoken;
        if(!jwtToken)
        {
            return resp.status(200).send({ auth : false , message : "No Token Provider !"})
        }
        else{
            jwt.verify(jwtToken,"some key",async function(err,decoded){
                if(err)
                {
                    return resp.status(200).send({auth : false , message : 'Failed To Authentication !'})
                }
                else{
                    let userID = req.params.id;
                    let data = await employeeBL.DeleteEmployee(userID)
                    return resp.status(200).send(data)
                }
            })
        }
    })
module.exports = router;
const departmentBL = require('../models/departmentBL');
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
                    let data = await departmentBL.GetAllDepartments()
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
                    let depID = req.params.id;
                    let data = await departmentBL.GetDepartmentByID(depID)
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
                    let newDepData = req.body;
                    let data = await departmentBL.AddDepartment(newDepData)
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
                    let depID = req.params.id;
                    let newDepData = req.body;
                    let data = await departmentBL.UpdateDepartment(depID,newDepData)
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
                    let depID = req.params.id;
                    let data = await departmentBL.DeleteDepartment(depID)
                    return resp.status(200).send(data)
                }
            })
        }
    })
module.exports = router;
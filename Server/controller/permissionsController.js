const permissionsBL = require('../models/permissionsBL');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');


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
                    let data = await permissionsBL.GetAllPermissions()
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
                    let perID = req.params.id;
                    let data = await permissionsBL.GetPermissionByID(perID)
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
                    let newPerData = req.body;
                    let data = await permissionsBL.AddPermission(newPerData)
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
                    let perID = req.params.id;
                    let newPerData = req.body;
                    let data = await permissionsBL.UpdateUser(perID,newPerData)
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
                    let perID = req.params.id;
                    let data = await permissionsBL.DeletePermission(perID)
                    return resp.status(200).send(data)
                }
            })
        }
    })
module.exports = router;
const shiftToEmpBL = require('../models/shiftToEmpBL');
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
                    let data = await shiftToEmpBL.GetAllEmpShifts()
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
                    let shiftID = req.params.id;
                    let data = await shiftToEmpBL.GetEmpShiftByID(shiftID)
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
                    let newShiftData = req.body;
                    let data = await shiftToEmpBL.AddShift(newShiftData)
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
                    let shiftID = req.params.id;
                    let newShiftData = req.body;
                    let data = await shiftToEmpBL.UpdateEmpShift(shiftID,newShiftData)
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
                    let shiftID = req.params.id;
                    let data = await shiftToEmpBL.DeleteShift(shiftID)
                    return resp.status(200).send(data)
                }
            })
        }
    })
module.exports = router;
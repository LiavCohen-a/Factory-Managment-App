import axios from 'axios';
import shiftsService from './shiftsService';

let url = process.env.REACT_APP_API_KEY_EmpShifts;

let getAllShiftsToEmp = async (jwt,EmpID) => {
    let resp = await axios.get(url,{headers : {jwttoken : jwt }});
    let employeesShifts = resp.data;
    let result = employeesShifts.filter(doc => doc.employeeID == EmpID )
    let shifts = await shiftsService.getAllShifts(jwt)
    let tempArr = [];
    shifts.filter(shift => {
        result.forEach(empShifts => {
            if(empShifts.shiftID == shift._id){
                tempArr.push(shift)
            }
        });
    })
  
    return tempArr;
}
let getAllShifts = async (jwt,EmpID) => {
    let shifts = await shiftsService.getAllShifts(jwt)
    let resp = await axios.get(url,{headers : {jwttoken : jwt }});
    let employeesShifts = resp.data;
    
    employeesShifts = employeesShifts.filter(x =>x.employeeID == EmpID)
    if(employeesShifts.length >= 1){
        employeesShifts.forEach(empShift => {
            let index = shifts.findIndex(shift => shift._id == empShift.shiftID)
            if(index >= 0)
            {
                shifts.splice(index,1)
            }
        })
        return shifts;
    }
    else{
        return shifts;
    }
   
}


let addShift = async (jwt,shift) => {
    let resp = await axios.post(url,shift,{headers : {jwttoken : jwt }});
    return resp.data;
}
let deleteShiftsToEmployee = async (jwt,empID) => {
    let resp = await axios.get(url,{headers : {jwttoken : jwt }})
    let allShiftsToEmp = resp.data;
    allShiftsToEmp = allShiftsToEmp.filter(x =>x.employeeID == empID)
   
    allShiftsToEmp.forEach(async shift => {
        await axios.delete(url+shift._id,{headers : {jwttoken : jwt }});
    })

    return "Employee Shifts Was Deleted !";
}
let deleteShift = async (jwt,shiftID,empID) => {
    let shiftToEmp = await getShift(jwt,shiftID,empID)
    let resp = await axios.delete(url+shiftToEmp._id,{headers : {jwttoken : jwt }})
    return resp.data;
}
let getShift = async (jwt,shiftID,empID) => {
    let resp = await axios.get(url,{headers : {jwttoken : jwt }})
    let allShiftsToEmp = resp.data;
    let index = allShiftsToEmp.findIndex(shift => shift.employeeID == empID && shift.shiftID == shiftID )
    return allShiftsToEmp[index];
}
let getShiftsToEmp = async (jwt) => {
    let resp = await axios.get(url,{headers : {jwttoken : jwt }})   
    return resp.data;
}
export default {getShiftsToEmp,getShift,getAllShiftsToEmp,addShift,getAllShifts,deleteShiftsToEmployee,deleteShift};

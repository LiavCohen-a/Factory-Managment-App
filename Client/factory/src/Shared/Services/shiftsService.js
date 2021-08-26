import axios from 'axios';
import shiftsToEmpService from './shiftsToEmpService';
import employeesService from './employeesService';

let url = process.env.REACT_APP_API_KEY_Shifts;


let getAllShifts = async (jwt) => {
    let resp = await axios.get(url,{headers : {jwttoken : jwt }});
    return resp.data;
}
let addShift = async (shift) => {
    let resp = await axios.post(url,shift);
    return resp.data;
}
let getAllEmpToShifts = async (jwt,shiftID) => {
    let shiftsToEmp = await shiftsToEmpService.getShiftsToEmp(jwt);
    let employees = await employeesService.getAllEmployees(jwt)
    shiftsToEmp = shiftsToEmp.filter(doc => doc.shiftID == shiftID )
    
    let tempArr = [];
    shiftsToEmp.forEach(shiftToEmp => {
        let index = employees.findIndex(emp => emp._id == shiftToEmp.employeeID)
        tempArr.push(employees[index])
    });

    return tempArr;
}
let getEmployeesToShift = async (jwt,shiftID) => {
    let shiftsToEmp = await shiftsToEmpService.getShiftsToEmp(jwt);
    let employees = await employeesService.getAllEmployees(jwt)
    shiftsToEmp = shiftsToEmp.filter(doc => doc.shiftID == shiftID )


    shiftsToEmp.forEach(shiftToEmp => {
        let index = employees.findIndex(emp => emp._id == shiftToEmp.employeeID)
        if(index >= 0){
            employees.splice(index,1)
        }
        
    });
    return employees;
}

export default {getEmployeesToShift,getAllShifts,addShift,getAllEmpToShifts};

import axios from 'axios';
let url = process.env.REACT_APP_API_KEY_Employees;

let getAllEmployees = async (jwt) => {
    let resp = await axios.get(url,{headers : {jwttoken : jwt }});
    return resp.data;
}
let getEmployeesToDepartment = async (jwt,dep) => {
    let result = await getAllEmployees(jwt)
    let newArr = result.filter(emp => emp.department == dep)
    return newArr;
}
let getEmployeeByID = async (jwt,empID) => {
    let resp = await axios.get(url+empID,{headers : {jwttoken : jwt }});
    return resp.data;
}
let updateEmployee = async (jwt,empID,newEmpData) => {
    let resp = await axios.put(url+empID,newEmpData,{headers : {jwttoken : jwt }});
    return resp.data;
}
let deleteEmployee = async (jwt,empID) => {
    let resp = await axios.delete(url+empID,{headers : {jwttoken : jwt }});
    return resp.data;
}
let addNewEmployee = async (jwt,empData) => {
    let resp = await axios.post(url,empData,{headers : {jwttoken : jwt }});
    return resp.data;
}

export default {addNewEmployee,getEmployeesToDepartment,getAllEmployees,getEmployeeByID,updateEmployee,deleteEmployee};

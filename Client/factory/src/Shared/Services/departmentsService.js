import axios from 'axios';
let url = process.env.REACT_APP_API_KEY_Dep;

let getAllDepartments = async (jwt) => {
    let resp = await axios.get(url,{headers : {jwttoken : jwt }});
    return resp.data;
}
let getDepartmentByID = async (jwt,id) => {
    let resp = await axios.get(url+id,{headers : {jwttoken : jwt }});
    return resp.data;
}
let updateDepartment = async (jwt,id,dep) => {
    let resp = await axios.put(url+id,dep,{headers : {jwttoken : jwt }});
    return resp.data;
}
let addDepartment = async (jwt,dep) => {
    let resp = await axios.post(url,dep,{headers : {jwttoken : jwt }});
    return resp.data;
}
let deleteDepartment = async (jwt,depID) => {
    let resp = await axios.delete(url+depID,{headers : {jwttoken : jwt }});
    return resp.data;
}
export default {deleteDepartment,addDepartment,updateDepartment,getAllDepartments,getDepartmentByID};

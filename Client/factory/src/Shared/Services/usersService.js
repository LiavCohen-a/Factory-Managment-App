import axios from 'axios';
let url = process.env.REACT_APP_API_KEY_Users;

let getUserByID =async (userID) => {
    let resp = await axios.get(url+userID);
    return resp.data;
}

let getAllUsers =async () => {
    let resp = await axios.get(url);
    return resp.data;
}
let updateUser =async (id,userData) => {
    let resp = await axios.put(url+id,userData);
    return resp.data;
}
let deleteUser =async (id) => {
    let resp = await axios.delete(url+id);
    return resp.data;
}
let addUser =async (user) => {
    let resp = await axios.post(url,user);
    return resp.data;
}
export default {getUserByID,getAllUsers,updateUser,deleteUser,addUser};

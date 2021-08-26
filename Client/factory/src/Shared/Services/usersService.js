import axios from 'axios';
let url = process.env.REACT_APP_API_KEY_Users;

let getUserByID =async (userID) => {
    let resp = await axios.get(url+userID);
    return resp.data;
}



export default {getUserByID};

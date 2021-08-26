import axios from 'axios';
let url = process.env.REACT_APP_API_KEY_Auth;

let connectUser = async (userDetails) => {
    let resp = await axios.post(url,userDetails);
    return resp.data;
}

export default {connectUser};

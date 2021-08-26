//React
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";

//Css
import '../../Shared/Css/loginStyle.css';

import Alert from "react-bootstrap/Alert";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'

//Services
import authService from "../../Shared/Services/authService";
import usersService from "../../Shared/Services/usersService";

function LoginPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const loginUser = async (e) => {
    e.preventDefault();
    let userDetails = { userName: userName, password: password };
    let resp = await authService.connectUser(userDetails)
    if (resp.auth) {
      setMessage("");
      let user = await usersService.getUserByID(resp.userId);
      let action = {type : "UserConnect",
                    payload : {jwtToken : resp.jwtToken ,
                               isAuth : true,
                               fullName : user.fullName ,
                               isAdmin : user.isAdmin}}
      dispatch(action)
      history.push('/Employees')
    } else {
      setMessage("Wrong Email Or Password !");
    }
  };

  return (
    <div className="LoginPage">
      <h1> Login Page </h1>
      <form className='LoginForm' onSubmit={(e) => loginUser(e)}>
        <Form.Floating className="mb-3">
              <Form.Control required minLength="2" onChange={(e) => setUserName(e.target.value)}  type="text" />
              <label htmlFor="floatingInputCustom">User Name</label>
        </Form.Floating>

         <Form.Floating className="mb-3">
            <Form.Control required minLength="6" onChange={(e) => setPassword(e.target.value)}  type="password" />
            <label htmlFor="floatingInputCustom">Password</label>
         </Form.Floating>
         
        <Button type='submit' variant="secondary">Log In</Button> <br />
        {message ? 
         <Alert  variant={"secondary"}>
          {message}
        </Alert>
         : ''}
      </form>
    </div>
  );
}

export default LoginPage;

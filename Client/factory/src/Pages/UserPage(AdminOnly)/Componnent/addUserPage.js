//React
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

//Css
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'

//Services
import usersService from "../../../Shared/Services/usersService";

function AddUserPage(props) {
  const storeData = useSelector(state => state);
  const history = useHistory();

  const [fullName,setFullName] = useState("")
  const [userName,setUserName] = useState("")
  const [isAdmin,setIsAdmin] = useState(false)
  const [password,setPassword] = useState("")

 
  
  const addUser =async (e) => {
    e.preventDefault()
    let user = {
      fullName : fullName,
      userName : userName,
      isAdmin : isAdmin,
      password : password
    }
    let result = await usersService.addUser(user)
    alert(result)
    history.push('/Users')
  }
  return (
    <div >
      <h1>Add User Page</h1>
      <form className="AddEmployeeForm" onSubmit={e => addUser(e)}>
          <Form.Floating className="mb-3">
                <Form.Control value={fullName} required  onChange={(e) => setFullName(e.target.value)}  type="text" />
                <label htmlFor="floatingInputCustom">Full Name</label>
          </Form.Floating>

          <Form.Floating className="mb-3">
                <Form.Control value={userName} required onChange={(e) => setUserName( e.target.value)}  type="text" />
                <label htmlFor="floatingInputCustom">User Name</label>
          </Form.Floating>

          <Form.Floating className="mb-3">
                <Form.Control value={password} required onChange={(e) => setPassword( e.target.value)}  type="text" />
                <label htmlFor="floatingInputCustom">Password</label>
          </Form.Floating> 

      <div className="DropdownButton">
        <Form.Check checked={isAdmin} value={isAdmin} onChange={() => setIsAdmin(!isAdmin)} type="checkbox" label="Is Admin" />
      </div>
      <Button type='submit' variant="secondary">Add User</Button> <br />
      <Button onClick={() => history.push('/Users')} type='button' variant="dark">Back To Users</Button> <br />
      </form>
    </div>
  );
}

export default AddUserPage;

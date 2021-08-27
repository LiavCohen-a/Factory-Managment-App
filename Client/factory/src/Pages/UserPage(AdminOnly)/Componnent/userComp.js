//React
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";

//Css
import '../../../Shared/Css/shiftStyle.css'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import { useHistory } from "react-router-dom";
import usersService from "../../../Shared/Services/usersService";

//Services


function UserComp(props) {
  const storeData = useSelector(state => state);
  const history = useHistory()
  const [user,setUser] = useState({});
  const [bool,setOpenPasswordSection] = useState(false);

  useEffect( () => {
    setUser(props.User)
  },[])

  const deleteUser =async () => {
    let resp  = await usersService.deleteUser(user._id)
    alert(resp)
    props.callBack()
  }
  
  return (
    <div >
      <div className="ShiftCard">
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>{user.fullName}</Card.Title>

            <ListGroup   variant="flush">
                <ListGroup.Item>User Name : <b>{user.userName}</b></ListGroup.Item>
              <ListGroup.Item>{user.isAdmin ? "User Is Admin" : "User Is Not Admin" } </ListGroup.Item>
              <ListGroup.Item onClick={() => setOpenPasswordSection(!bool)} >User Password  {bool ? user.password : null}</ListGroup.Item>

             </ListGroup>  
             <Button style={{marginRight:'5px',marginLeft : '5px'}} size="sm" onClick={() => history.push("/Users/EditUser/" + user._id) }variant="outline-success">Edit User</Button>
              <Button  size="sm" onClick={() => deleteUser() } variant="outline-danger">Delete User</Button>
        </Card.Body>
      </Card>
      </div>
    </div>
  );
}

export default UserComp;

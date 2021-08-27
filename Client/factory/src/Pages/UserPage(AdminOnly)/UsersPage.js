//React
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { useHistory } from "react-router-dom";

//Css
import '../../Shared/Css/shiftStyle.css';
import Button from 'react-bootstrap/Button'

//Services
import usersService from "../../Shared/Services/usersService";
import UserComp from "./Componnent/userComp";


function UsersPage() {
  const storeData = useSelector(state => state);
  const history = useHistory();

  const [users,setUsers] = useState([]);

  useEffect( () => {
    async function setData(){
      let users = await usersService.getAllUsers()
      setUsers(users);
    }
    if(storeData == null){
      history.push("/")
    }
    else{
      setData()
      if(!storeData.isAdmin){
        history.push("/")
      }
    }
  },[users.length])

  return (
    <div className="Page">
      <div>
        <LinkContainer to="/Users/AddUser" >
                  <Button size="sm" variant="secondary">Add New User</Button>
        </LinkContainer>
      </div>
      <div className="ShiftsCardContainer">
        {
          users.map((user,index) => {
            return <UserComp key={index} User={user} callBack={() => setUsers([...users,{}])} />
          })
        }
      </div>
    </div>
  );
}

export default UsersPage;

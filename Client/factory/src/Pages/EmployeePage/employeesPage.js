//React
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";

//Css
import '../../Shared/Css/employeeStyle.css'
import Button from 'react-bootstrap/Button'

//Services
import employeesService from "../../Shared/Services/employeesService";
import EmployeeComp from "./Components/employeeComp";
const {REACT_APP_API_KEY} = process.env

function EmployeesPage() {
  const storeData = useSelector(state => state);
  const history = useHistory();
  
  const [emps,setEmps] = useState([]);

  useEffect( () => {
    async function setData(){
      let empsData  = await employeesService.getAllEmployees(storeData.jwtToken)
      setEmps(empsData);
    }
    if(storeData == null){
      history.push("/")
    }
    else{
      setData()
    }
  },[emps.length])

  return (
    <div className="Page">
      <div>
        <LinkContainer to="/Employees/AddEmployee" >
                  <Button disabled={!storeData.isAdmin} size="sm" variant="secondary">Add New Employee</Button>
        </LinkContainer>
      </div>
      
      <div className="EmpCardContainer">
          {
            emps.map((emp,index) => {
              return <EmployeeComp key={index} Emp={emp} callBack={() => setEmps([])}  />
            })
          }
      </div>
    </div>
  );
}

export default EmployeesPage;

//React
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";

//Css
import '../../Shared/Css/employeeStyle.css'
import Button from 'react-bootstrap/Button'

//Services
import EmployeeComp from "./Components/employeeComp";
import employeesService from "../../Shared/Services/employeesService";

function SearchEmployeesPage() {
  const storeData = useSelector(state => state);
  const history = useHistory();

  const [emps,setEmps] = useState([]);

  useEffect( () => {
    async function setData(){
      let empsData  = await employeesService.getAllEmployees(storeData.jwtToken)
      let result = empsData.filter(x => x.firstName.includes(storeData.searchBox) || x.lastName.includes(storeData.searchBox) || x.department.includes(storeData.searchBox) )
      setEmps(result);
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
                  <Button size="sm" variant="secondary">Add New Employee</Button>
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

export default SearchEmployeesPage;

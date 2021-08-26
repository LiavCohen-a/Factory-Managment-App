//React
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";

//Css
import '../../Shared/Css/departmentStyle.css'
import Button from 'react-bootstrap/Button'

//Services
import departmentsService from "../../Shared/Services/departmentsService";
import DepartmentComp from "./Components/departmentComp";


function DepartmentPage() {
  const storeData = useSelector(state => state);
  const history = useHistory();

  const [departments,setDepartments] = useState([]);

  useEffect( () => {
    async function setData(){
      let departments = await departmentsService.getAllDepartments(storeData.jwtToken)
      setDepartments(departments);
    }
    if(storeData == null){
      history.push("/")
    }
    else{
      setData()
    }
  },[departments.length])

  return (
    <div className="Page">
      <div>
          <LinkContainer to="/Departments/AddDepartment" >
                    <Button disabled={!storeData.isAdmin} size="sm" variant="secondary">Add New Department</Button>
          </LinkContainer>
      </div>
      <div className="DepCardContainer">
        {
            departments.map((dep,index) => {
                return <DepartmentComp key={index} Dep={dep} callBack={(e) => setDepartments([])} />
            })
        }
      </div>
    </div>
  );
}

export default DepartmentPage;

//React
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";

//Css
import '../../../Shared/Css/departmentStyle.css'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'

//Services
import employeesService from "../../../Shared/Services/employeesService";
import departmentsService from "../../../Shared/Services/departmentsService";

function DepartmentComp(props) {
  const storeData = useSelector(state => state);

  const [dep,setDep] = useState({});
  const [managerName,setManagerName] = useState("");
  const [empToDep,setEmpToDep] = useState([]);
  
  useEffect( () => {
    setDep(props.Dep)
    async function setData(){
      let empArr = await employeesService.getEmployeesToDepartment(storeData.jwtToken,props.Dep.departmentName)
      setEmpToDep(empArr)
      let manager = await employeesService.getEmployeeByID(storeData.jwtToken,props.Dep.departmentManagerID)
      setManagerName(manager.firstName + " " +manager.lastName)
    }
    setData()
  },[empToDep.length])

  const deleteDep =async () => {
    let resp = await departmentsService.deleteDepartment(storeData.jwtToken,dep._id);
    alert(resp);
    props.callBack("Reload")
  
  }

  return (
    <div >
      <div className="DepCard">
      <Card style={{ width: '18rem' }}>
        <Card.Body>
            <Card.Title> {dep.departmentName} </Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Manager : {managerName ? managerName : "ID not detected"} </Card.Subtitle>
            <Card.Subtitle className="mb-2 text-muted">Employees : {empToDep.length} </Card.Subtitle>
            <ListGroup   variant="flush">
              <ListGroup.Item><h5>Employee List</h5></ListGroup.Item>
                { empToDep.length >= 1 ?
                  empToDep.map(emp =>{
                    return <ListGroup.Item key={emp._id} >
                    <LinkContainer to={"/Employees/EditEmployee/" + emp._id} >
                        <Button disabled={!storeData.isAdmin} size="sm" variant="outline-secondary">{emp.firstName+" "+emp.lastName}</Button>
                    </LinkContainer>
                    </ListGroup.Item>
                  })
                  :
                  "No Employees In Department !"
                }
                <ListGroup.Item></ListGroup.Item>
             </ListGroup>
              <div style={{display:"flex",justifyContent : 'center'}}>
                  <LinkContainer to={"/Departments/EditDep/" + dep._id} >
                      <Button disabled={!storeData.isAdmin} size="sm" variant="outline-primary">Edit Department</Button>
                  </LinkContainer>
           
                { empToDep.length <= 0 ?   
                  <Button disabled={!storeData.isAdmin} style={{marginLeft : '15px'}} size="sm" onClick={() => deleteDep() } variant="outline-primary">Delete Department</Button>
                  :
                  null
                }
              </div>
        </Card.Body>
      </Card>
      </div>
    </div>
  );
}

export default DepartmentComp;

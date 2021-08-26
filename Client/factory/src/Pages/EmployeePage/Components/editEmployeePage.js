//React
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

//Css
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'

//Services
import employeesService from "../../../Shared/Services/employeesService";
import departmentsService from "../../../Shared/Services/departmentsService";


function EditEmployeePage(props) {
  const storeData = useSelector(state => state);
  const history = useHistory();

  const [firstName,setFirstName] = useState("")
  const [lastName,setLastName] = useState("")
  const [startWorkYear,setStartWorkYear] = useState("")
  const [department,setDepartment] = useState("")
  const [deps,setDepartments] = useState([])

  useEffect( () => {
    let id = props.match.params.id;
    async function getEmpData()
    {
      let deps = await departmentsService.getAllDepartments(storeData.jwtToken);
      setDepartments(deps)
      let employee = await employeesService.getEmployeeByID(storeData.jwtToken,id)
      setFirstName(employee.firstName)
      setLastName(employee.lastName)
      setStartWorkYear(employee.startWorkYear.split('T')[0])
      setDepartment(employee.department)
     
    } 
    getEmpData()
  },[])
  
  const updateEmployee =async (e) => {
    e.preventDefault()
    let id = props.match.params.id;
    let emp = {
      firstName : firstName,
      lastName : lastName,
      startWorkYear : startWorkYear,
      department : department
    }
    let result = await employeesService.updateEmployee(storeData.jwtToken,id,emp)
    alert(result)
    history.push('/Employees')
  }
  return (
    <div >
      <h1>Edit Employee Page</h1>
      <form className="AddEmployeeForm" onSubmit={e => updateEmployee(e)}>
          <Form.Floating className="mb-3">
                <Form.Control value={firstName} required  onChange={(e) => setFirstName(e.target.value)}  type="text" />
                <label htmlFor="floatingInputCustom">First Name</label>
          </Form.Floating>

          <Form.Floating className="mb-3">
                <Form.Control value={lastName} required onChange={(e) => setLastName( e.target.value)}  type="text" />
                <label htmlFor="floatingInputCustom">Last Name</label>
          </Form.Floating>

          <Form.Floating className="mb-3">
                <Form.Control value={startWorkYear} required onChange={(e) => setStartWorkYear( e.target.value)}  type="date" />
                <label htmlFor="floatingInputCustom">Start Work Year</label>
          </Form.Floating> 

      <div className="DropdownButton">
        <DropdownButton id="dropdown-button-dark-example2" variant="secondary" menuVariant="dark" title={department} >
          { deps.map(dep => {
              return  <Dropdown.Item   onClick={(e) => { setDepartment(e.target.value) }} 
              as="button" type="button" value={dep.departmentName} key={dep._id} >{dep.departmentName}</Dropdown.Item>
          })}
        </DropdownButton>
      </div>
      <Button type='submit' variant="secondary">Update Employee</Button> <br />
      <Button onClick={() => history.push('/Employees')} type='submit' variant="dark">Back To Employees</Button> <br />
      </form>
    </div>
  );
}

export default EditEmployeePage;

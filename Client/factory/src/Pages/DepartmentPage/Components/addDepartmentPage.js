//React
import { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

//Css
import '../../../Shared/Css/departmentStyle.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'

//Services
import departmentsService from "../../../Shared/Services/departmentsService";


function AddDepartmentPage(props) {
  const storeData = useSelector(state => state);
  const history = useHistory();

  const [depName,setDepName] = useState("")
  const [depManager,setDepManager] = useState("")
    
  const addDep =async (e) => {
    e.preventDefault()
    let dep = {
      departmentName : depName,
      departmentManagerID : depManager
    }
    let result = await departmentsService.addDepartment(storeData.jwtToken,dep)
    alert(result)
    history.push('/Departments')
  }

  return (
    <div className="Page">
      <h1>Add Department Page</h1>
      <form className="AddDepartmentForm" onSubmit={e => addDep(e)}>
          <Form.Floating className="mb-3">
                <Form.Control value={depName} required  onChange={(e) => setDepName(e.target.value)}  type="text" />
                <label htmlFor="floatingInputCustom">Department Name</label>
          </Form.Floating>
          <Form.Floating className="mb-3">
                <Form.Control value={depManager} required onChange={(e) => setDepManager( e.target.value)}  type="text" />
                <label htmlFor="floatingInputCustom">Department Manager (EmpID ONLY )</label>
          </Form.Floating>
          <Button type='submit' variant="secondary">Add New Department</Button> <br />
          <Button onClick={() => history.push('/Departments')} type='submit' variant="dark">Back To Departments</Button> <br />
      </form>
    </div>
  );
}

export default AddDepartmentPage;

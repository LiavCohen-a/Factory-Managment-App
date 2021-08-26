//React
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

//Css
import '../../../Shared/Css/departmentStyle.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'

//Services
import departmentsService from "../../../Shared/Services/departmentsService";


function EditDepartmentComp(props) {
  const storeData = useSelector(state => state);
  const history = useHistory();

  const [depName,setDepName] = useState("")
  const [depManager,setDepManager] = useState("")

  useEffect( () => {
    let id = props.match.params.id;
    async function getDepData()
    {
      let department = await departmentsService.getDepartmentByID(storeData.jwtToken,id)
      setDepName(department.departmentName)
      setDepManager(department.departmentManagerID)
    } 
    getDepData()
  },[])
  
  const updateDep =async (e) => {
    e.preventDefault()
    let id = props.match.params.id;
    let dep = {
      departmentName : depName,
      departmentManagerID : depManager
    }
    let result = await departmentsService.updateDepartment(storeData.jwtToken,id,dep)
    alert(result)
    history.push('/Departments')
  }
  return (
    <div className="Page" >
      <h1>Edit Dep Page</h1>
      <form className="AddDepartmentForm" onSubmit={e => updateDep(e)}>
          <Form.Floating className="mb-3">
                <Form.Control value={depName} required  onChange={(e) => setDepName(e.target.value)}  type="text" />
                <label htmlFor="floatingInputCustom">Department Name</label>
          </Form.Floating>

          <Form.Floating className="mb-3">
                <Form.Control value={depManager} required onChange={(e) => setDepManager( e.target.value)}  type="text" />
                <label htmlFor="floatingInputCustom">Department Manager (EmpID ONLY )</label>
          </Form.Floating>

          <Button type='submit' variant="secondary">Update Department</Button> <br />
          <Button onClick={() => history.push('/Departments')} type='submit' variant="dark">Back To Departments</Button> <br />
      </form>
    </div>
  );
}

export default EditDepartmentComp;

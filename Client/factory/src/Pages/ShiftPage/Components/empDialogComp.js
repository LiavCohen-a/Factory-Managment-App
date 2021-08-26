//React
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";


//Css
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'

//Services
import shiftsToEmpService from "../../../Shared/Services/shiftsToEmpService";
import shiftsService from "../../../Shared/Services/shiftsService";


function EmpDialogComp(props) {
  const storeData = useSelector(state => state);

  const [employees,setEmployees] = useState([]);
  const [empID,setEmpID] = useState("");
  const [empName,setEmpName] = useState("");

  useEffect( () => {
    async function getData(){
      let shiftsData = await shiftsService.getEmployeesToShift(storeData.jwtToken,props.Shift._id)
      setEmployees(shiftsData)
    }
    getData()
  },[employees.length])
  
  const addEmpToShift =async () => {
      let newEmpShift ={
        employeeID : empID,
        shiftID : props.Shift._id
      }
      let resp = await shiftsToEmpService.addShift(storeData.jwtToken,newEmpShift);
      alert(resp);
      props.callBack2()
  }

  return (
    <div >
      <Modal.Dialog  >
        <Modal.Header >
          <Modal.Title style={{marginLeft : '27%'}}>New Emp</Modal.Title>
        </Modal.Header>      
         <Modal.Body>
            <DropdownButton id="dropdown-button-dark-example2" variant="outline-secondary" menuVariant="dark" title={ empName ? empName :'Choose Employee'} >
                  {  employees.map((emp,index) => {
                      return  <Dropdown.Item   onClick={(e) => { setEmpID(e.target.value); setEmpName(emp.firstName + " " + emp.lastName); }} as="button" type="button" value={emp._id} key={index} >{emp.firstName} {emp.lastName} </Dropdown.Item>
                  })}
            </DropdownButton>
        </Modal.Body>   
        <Modal.Footer>
          <Button style={{marginRight : '23px'}} variant="outline-danger" onClick={() => props.callBack()}>Close</Button>
          <Button variant="outline-success" onClick={() => addEmpToShift() } >Add Employee</Button>
        </Modal.Footer>
      </Modal.Dialog>          
    </div>
  );
}

export default EmpDialogComp;

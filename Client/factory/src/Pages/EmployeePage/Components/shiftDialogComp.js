//React
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

//Css
import '../../../Shared/Css/employeeStyle.css'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'

//Services
import shiftsToEmpService from "../../../Shared/Services/shiftsToEmpService";


function ShiftDialogComp(props) {
  const storeData = useSelector(state => state);

  const [shifts,setShifts] = useState([]);
  const [shiftID,setShiftID] = useState("");
  const [shiftDate,setShiftDate] = useState("");

  useEffect( () => {
    async function getData(){
      let shiftsData = await shiftsToEmpService.getAllShifts(storeData.jwtToken,props.Emp._id)
      setShifts(shiftsData)
    }
    getData()
  },[shifts.length])
  
  const addShiftToEmp =async () => {
      let newEmpShift ={
        employeeID : props.Emp._id,
        shiftID : shiftID
      }
      let resp = await shiftsToEmpService.addShift(storeData.jwtToken,newEmpShift);
      alert(resp);
      props.callBack2()
  }

  return (
    <div >
      <Modal.Dialog  >
        <Modal.Header  >
          <Modal.Title style={{marginLeft : '27%'}}>New Shift</Modal.Title>
        </Modal.Header>
              
        <Modal.Body>
            <DropdownButton id="dropdown-button-dark-example2" variant="outline-secondary" menuVariant="dark" title={ shiftDate ? shiftDate :'Choose Shift'} >
                  { shifts.map((shift,index) => {
                      return  <Dropdown.Item   onClick={(e) => {
                        setShiftID(e.target.value)
                        setShiftDate(shift.date)
                    }} 
                      as="button" type="button" value={shift._id} key={index} >{shift.date} - {shift.startTime} - {shift.endTime} </Dropdown.Item>
                  })}
            </DropdownButton>
        </Modal.Body>
              
        <Modal.Footer>
             <Button style={{marginRight : '55px'}} variant="outline-danger" onClick={() => props.callBack()}>Close</Button>
             <Button variant="outline-success" onClick={() => addShiftToEmp() } >Add Shift</Button>
        </Modal.Footer>

      </Modal.Dialog> 
    </div>
  );
}

export default ShiftDialogComp;

//React
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { LinkContainer } from "react-router-bootstrap";

//Css
import '../../../Shared/Css/employeeStyle.css'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'

//Services
import shiftsToEmpService from "../../../Shared/Services/shiftsToEmpService";
import ShiftDialogComp from "./shiftDialogComp";
import employeesService from "../../../Shared/Services/employeesService";


function EmployeeComp(props) {
  const storeData = useSelector(state => state);

  const [emp,setEmp] = useState({});
  const [shiftToEmp,setShiftsToEmp] = useState([]);
  const [bool,setOpenShiftSection] = useState(false)
  const [date,setDate] = useState("");

  useEffect( () => {
    let result= props.Emp.startWorkYear.split('T')
    setEmp(props.Emp)
    setDate(result[0])  
    async function getData(){
      let shifts = await shiftsToEmpService.getAllShiftsToEmp(storeData.jwtToken,props.Emp._id)
      setShiftsToEmp(shifts)
    }
    getData()
  },[shiftToEmp.length])
  
  const deleteEmployee =async () => {
    if(shiftToEmp.length >= 1){
      let resp1 = await shiftsToEmpService.deleteShiftsToEmployee(storeData.jwtToken,emp._id)
      alert(resp1)
    }
    let resp2 = await employeesService.deleteEmployee(storeData.jwtToken,emp._id)
    alert(resp2)
    props.callBack(emp)
  }
  const deleteShift =async (shiftID) => {
    let resp = await shiftsToEmpService.deleteShift(storeData.jwtToken,shiftID,emp._id)
    alert(resp)
    setShiftsToEmp([...shiftToEmp,{}])
  } 

  return (
    <div >
      <div className="EmpCard">
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title> {emp.firstName + " " + emp.lastName} </Card.Title>
            <Card.Subtitle className="mb-2 text-muted"> {emp.department} </Card.Subtitle>
            <Card.Subtitle className="mb-2 text-muted"> {date} </Card.Subtitle>
              
            <CopyToClipboard text={emp._id}
                   onCopy={() => alert("User ID Copy")}>
                     <Button size="sm" variant="outline-secondary">Copy Employee ID</Button>
            </CopyToClipboard>
         
            <ListGroup   variant="flush">
                <ListGroup.Item></ListGroup.Item>
                <ListGroup.Item>Employee Shifts</ListGroup.Item>
                  { shiftToEmp.length >= 1 ? 
                    shiftToEmp.map((shift,index) => {
                      return  <ListGroup.Item className="ListGroup" key={index}> 
                              <span><b>  Date : {shift.date} </b> </span>
                              <span> Start : {shift.startTime} &nbsp;&nbsp;
                              End : {shift.endTime}</span>
                            <Button size="sm" disabled={!storeData.isAdmin} onClick={() => deleteShift(shift._id)} variant="outline-danger">Delete Shift</Button>{' '}

                            </ListGroup.Item>
                     
                    })
                    :
                    "The Employee has no shifts Yet !"
                  }
                <ListGroup.Item></ListGroup.Item>
             </ListGroup>
            {
              bool == false ? 
              <div style={{display : 'flex',justifyContent : 'center'}} >  
                <LinkContainer to={'/Employees/EditEmployee/'+props.Emp._id} >
                    <Button disabled={storeData.isAdmin ? false : true} size="sm" variant="outline-primary">Edit Employee</Button>
                </LinkContainer>
                <Button disabled={!storeData.isAdmin} style={{marginRight:'5px',marginLeft : '5px'}} size="sm" onClick={() => setOpenShiftSection(!bool) }variant="outline-success">Add Shift</Button>
                <Button disabled={!storeData.isAdmin} size="sm" onClick={() => deleteEmployee() } variant="outline-danger">Delete Employee</Button>
              </div>
               :
               null
            }           
            {
                bool ?
                <ShiftDialogComp Emp={emp} callBack={() => setOpenShiftSection(!bool)} callBack2={() => { setOpenShiftSection(!bool); setShiftsToEmp([...shiftToEmp,{}]) }} />
                : 
                null 
            }           
        </Card.Body>
      </Card>
      </div>
    </div>
  );
}

export default EmployeeComp;

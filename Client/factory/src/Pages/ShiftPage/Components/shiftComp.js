//React
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";

//Css
import '../../../Shared/Css/shiftStyle.css'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'

//Services
import shiftsService from '../../../Shared/Services/shiftsService';
import EmpDialogComp from "./empDialogComp";

function ShiftComp(props) {
  const storeData = useSelector(state => state);

  const [shift,setShift] = useState({});
  const [empToShift,setEmpToShift] = useState([]);
  const [bool,setOpenShiftSection] = useState(false);
  const [date,setDate] = useState("");

  useEffect( () => {
    let result= props.Shift.date.split('T')
    setShift(props.Shift)
    setDate(result[0]) 
    async function setData(){
      let empToShift = await shiftsService.getAllEmpToShifts(storeData.jwtToken,props.Shift._id)
      setEmpToShift(empToShift)
    }
    setData()
  },[empToShift.length])

  return (
    <div >
      <div className="ShiftCard">
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>Shift Date - {date} </Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Start Time - {shift.startTime} </Card.Subtitle>
            <Card.Subtitle className="mb-2 text-muted">End Time - {shift.endTime} </Card.Subtitle>
            <Card.Subtitle className="mb-2 text-muted">Employees In Shift - {empToShift.length} </Card.Subtitle>
            <ListGroup   variant="flush">
                <ListGroup.Item></ListGroup.Item>
                {empToShift.map(emp => {
                  return  <ListGroup.Item key={emp._id} >
                    <LinkContainer to={"/Employees/EditEmployee/"+emp._id} >
                        <Button disabled={!storeData.isAdmin} size="sm" variant="outline-secondary">{emp.firstName + " " + emp.lastName}</Button>
                    </LinkContainer>
                  </ListGroup.Item>
                })}
              <ListGroup.Item></ListGroup.Item>
             </ListGroup>  
             { bool == false ?
                <Button disabled={!storeData.isAdmin} onClick={() => setOpenShiftSection(!bool) } size="sm" variant="outline-success">Add Employee</Button>
                : 
                null }
            { bool ?
                <EmpDialogComp Shift={shift} callBack={() => setOpenShiftSection(!bool)} callBack2={() => { setOpenShiftSection(!bool); setEmpToShift([...empToShift,{}]) }} />
                : 
              null }
        </Card.Body>
      </Card>
      </div>
    </div>
  );
}

export default ShiftComp;

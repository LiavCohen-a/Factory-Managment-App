//React
import { useState } from "react";
import { useHistory } from "react-router-dom";

//Css
import '../../../Shared/Css/shiftStyle.css'
import Button from 'react-bootstrap/Button'

//Services
import shiftsService from "../../../Shared/Services/shiftsService";


function AddShiftPage(props) {
  const history = useHistory();

  const [date,setDate] = useState("");
  const [startTime,setStartTime] = useState("");
  const [endTime,setEndTime] = useState("");


  const sendShift =async (e) => {
    e.preventDefault()
    let shift = {
      date : date,
      startTime : startTime,
      endTime : endTime
    }
    let resp = await shiftsService.addShift(shift)
    alert(resp)
    history.push('/Shifts')
 }
  return (
    <div className="Page" >
        <h1>Add Shift Page</h1> 
      <form className="ShiftForm" onSubmit={e => sendShift(e)} >
        <input type='date' required onChange={e => setDate(e.target.value)} /> <br/>
        <input type='time' required onChange={e => setStartTime(e.target.value)} /> <br/>
        <input type='time' required onChange={e => setEndTime(e.target.value)} /> <br/>    
      <Button type="submit" size="sm" variant="secondary">Add New Shift</Button> <br/>
      <Button onClick={() => history.push('/Shifts')} type='submit' variant="dark">Back To Shifts</Button> <br />
      </form>
    </div>
  );
}

export default AddShiftPage;

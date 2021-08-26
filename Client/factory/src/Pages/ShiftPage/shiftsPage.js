//React
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { useHistory } from "react-router-dom";

//Css
import '../../Shared/Css/shiftStyle.css';
import Button from 'react-bootstrap/Button'

//Services
import shiftsService from "../../Shared/Services/shiftsService";
import ShiftComp from "./Components/shiftComp";

function ShiftsPage() {
  const storeData = useSelector(state => state);
  const history = useHistory();

  const [shifts,setShifts] = useState([]);

  useEffect( () => {
    async function setData(){
      let shifts = await shiftsService.getAllShifts(storeData.jwtToken)
      setShifts(shifts);
    }
    if(storeData == null){
      history.push("/")
    }
    else{
      setData()
    }
  },[shifts.length])
  return (
    <div className="Page">
      <div>
        <LinkContainer to="/Shifts/AddShift" >
                  <Button disabled={!storeData.isAdmin} size="sm" variant="secondary">Add New Shift</Button>
        </LinkContainer>
      </div>
      <div className="ShiftsCardContainer">
        {
          shifts.map(shift => {
            return <ShiftComp key={shift._id} Shift={shift} />
          })
        }
      </div>
    </div>
  );
}

export default ShiftsPage;

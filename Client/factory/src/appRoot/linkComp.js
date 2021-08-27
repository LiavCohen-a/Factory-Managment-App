//React
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

//Css
import { LinkContainer } from "react-router-bootstrap";
import Nav from "react-bootstrap/Nav";

//Services

function LinkComp() {
  const storeData = useSelector(state => state);

  return (
    <div style={{width : '100%',display : 'flex',justifyContent : 'center' }}>
      <LinkContainer style={{marginLeft : '60px'}} to="/Employees">
        <Nav.Link>Employees</Nav.Link>
      </LinkContainer>

      <LinkContainer style={{marginLeft : '20px',marginRight : '20px'}} to="/Departments">
        <Nav.Link>Departments</Nav.Link>
      </LinkContainer>

      <LinkContainer style={{marginLeft : '20px',marginRight : '20px'}} to="/Shifts">
        <Nav.Link>Shifts</Nav.Link>
      </LinkContainer>
      {
        storeData.isAdmin ? 
        <LinkContainer to="/Users">
          <Nav.Link>Users</Nav.Link>
        </LinkContainer>
       : null
      }
    </div>
  );
}

export default LinkComp;

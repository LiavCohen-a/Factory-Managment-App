//React
import { Link } from "react-router-dom";

//Css
import { LinkContainer } from "react-router-bootstrap";
import Nav from "react-bootstrap/Nav";

//Services

function LinkComp() {
  return (
    <div style={{width : '100%',display : 'flex',justifyContent : 'center' }}>
      <LinkContainer style={{marginLeft : '60px'}} to="/Employees">
        <Nav.Link>Employees</Nav.Link>
      </LinkContainer>

      <LinkContainer style={{marginLeft : '20px',marginRight : '20px'}} to="/Departments">
        <Nav.Link>Departments</Nav.Link>
      </LinkContainer>

      <LinkContainer to="/Shifts">
        <Nav.Link>Shifts</Nav.Link>
      </LinkContainer>
    </div>
  );
}

export default LinkComp;

//React
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
//Css
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'

//Services
import LinkComp from '../../appRoot/linkComp'

function NavBarComp() {
  const dispatch = useDispatch();
  const history = useHistory();

  const storeData = useSelector(state => state);
  const [searchBox,setSearchBox] = useState("");

  return (
    <div>
    <Navbar bg="light" expand="lg">
      <Navbar.Brand>Hello {storeData.fullName}</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav style={{ maxHeight: '100px' ,width:'80%'}} navbarScroll >
            <LinkComp />
        </Nav>
        <Form className="d-flex">
          <FormControl
            type="search"
            placeholder="Search"
            className="mr-2"
            aria-label="Search"
            onChange={e => setSearchBox(e.target.value)}
          />
          <Button onClick={() => { dispatch({type : 'Search Action',payload : searchBox}); history.push('/Employees/SearchResult'); } } variant="outline-success">Search</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
    </div>
  );
}

export default NavBarComp;

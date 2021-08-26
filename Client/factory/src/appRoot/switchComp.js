//React
import {Route,Switch} from 'react-router-dom';

//Pages
import AddDepartmentPage from '../Pages/DepartmentPage/Components/addDepartmentPage';
import EditDepartmentComp from '../Pages/DepartmentPage/Components/editDepartmentComp';
import DepartmentPage from '../Pages/DepartmentPage/departmentPage';
import AddEmployeePage from '../Pages/EmployeePage/Components/addEmployeePage';
import EditEmployeePage from '../Pages/EmployeePage/Components/editEmployeePage';
import EmployeesPage from '../Pages/EmployeePage/employeesPage';
import SearchEmployeesPage from '../Pages/EmployeePage/searchEmployeesPage';
import LoginPage from '../Pages/LoginPage/loginPage';
import AddShiftPage from '../Pages/ShiftPage/Components/addShiftPage';
import ShiftsPage from '../Pages/ShiftPage/shiftsPage';

function SwitchComp() {
    return (
      <div>
        <Switch>
            <Route exact path="/" component={LoginPage}/>
            <Route exact path="/Employees" component={EmployeesPage}/>
            <Route exact path="/Employees/SearchResult" component={SearchEmployeesPage}/>
            <Route exact path="/Employees/EditEmployee/:id" component={EditEmployeePage}/>
            <Route exact path="/Employees/AddEmployee" component={AddEmployeePage}/>
            <Route exact path="/Shifts" component={ShiftsPage}/>
            <Route exact path="/Shifts/AddShift" component={AddShiftPage}/>
            <Route exact path="/Departments" component={DepartmentPage}/>
            <Route exact path="/Departments/EditDep/:id" component={EditDepartmentComp}/>
            <Route exact path="/Departments/AddDepartment" component={AddDepartmentPage}/>
        </Switch>
      </div>
    );
  }
  
  export default SwitchComp;
  
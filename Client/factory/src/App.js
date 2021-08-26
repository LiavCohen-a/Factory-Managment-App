//React
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
//Css
import './App.css';
//Services
import SwitchComp from "./appRoot/switchComp";
import NavBarComp from "./Shared/Components/navBar";


function App() {
  const storeData = useSelector(state => state);
  const history = useHistory();
  useEffect(() => {
  if(storeData == null){
    history.push("/")
  }
  },[storeData])
  return (
    <div className="App">
      {
        storeData?.isAuth ? 
         <NavBarComp />   : ""
      }
      <div className="SwitchComp">
      <SwitchComp />
      </div>
    </div>
  );
}

export default App;

import './App.css';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

//Nav bar
import Navbar from './component/Navbar/Navbar';

function App() {
  return (

   <Router>
    <div>
      { <Navbar/> }
    </div>
   </Router>

    
   
  
  );
}

export default App;

import './App.css';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


//Nav bar
import Navbar from './component/Navbar/Navbar';
//create Mealplan
import MealPlanForm from './component/CreateMealplan/MealPlanForm';

function App() {
  return (

   <Router>
    <div>
      { <Navbar/> }

      <Routes>
        <Route path='/createmeal' element={<MealPlanForm />} />
      </Routes>
    </div>
   </Router>

    
   
  
  );
}

export default App;

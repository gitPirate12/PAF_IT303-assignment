import './App.css';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


//Nav bar
import Navbar from './component/Navbar/Navbar';
//create Mealplan
import MealPlanForm from './component/CreateMealplan/MealPlanForm';
//View mealplan
import MealPlanView from './component/MealPlanView/MealPlanView';

function App() {
  return (

   <Router>
    <div>
      { <Navbar/> }

      <Routes>
        <Route path='/createmeal' element={<MealPlanForm />} />
        <Route path='/viewmealplan' element={<MealPlanView />} />
      </Routes>
    </div>
   </Router>

    
   
  
  );
}

export default App;

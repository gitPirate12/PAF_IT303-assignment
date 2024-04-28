
import './App.css';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


//Nav bar
import Navbar from './component/Navbar/Navbar';
//create Mealplan
import MealPlanForm from './component/CreateMealplan/MealPlanForm';
//View mealplan
import FetchMealPlans from './component/FetchMealPlans/FetchMealPlans';
//Update meal plan
import MealPlanUpdate from './component/MealPlanUpdate/MealPlanUpdate';
function App() {
  return (

   <Router>
    <div>
      { <Navbar/> }

      <Routes>
        <Route path='/createmeal' element={<MealPlanForm />} />
        <Route path='/viewmealplan' element={<FetchMealPlans />} />
        <Route path='/updatemealplan' element={<MealPlanUpdate />} />

      </Routes>
    </div>
   </Router>

    
   
  
import ViewPost from './components/SocialMediaPosts/viewPost';

function App() {
  return (
 

  <Router>
      <div>
      
        <Routes>
        <Route path='/viewPost' element={<ViewPost />} />
          
        </Routes>
      </div>
      

    </Router>
    

  );
}

export default App;

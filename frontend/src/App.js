import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import ViewPost from './components/SocialMediaPosts/viewPost';//post


import Navbar from './component/Navbar/Navbar';//Nav bar
import MealPlanForm from './component/CreateMealplan/MealPlanForm';//create Mealplan
import FetchMealPlans from './component/FetchMealPlans/FetchMealPlans';//View mealplan
import MealPlanUpdate from './component/MealPlanUpdate/MealPlanUpdate';//Update meal plan

function App() {
  return (

   <Router>
    <div>
      { <Navbar/> }

      <Routes>
        <Route path='/createmeal' element={<MealPlanForm />} />
        <Route path='/viewmealplan' element={<FetchMealPlans />} />
        <Route path='/updatemealplan' element={<MealPlanUpdate />} />

        <Route path='/viewPost' element={<ViewPost />} />


      </Routes>
    </div>
   </Router>

    
   
  


    

  );
}

export default App;

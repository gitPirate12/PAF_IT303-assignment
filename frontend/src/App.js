import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ViewPost from './component/SocialMediaPosts/viewPost';
import AddPost from './component/SocialMediaPosts/addPost';
import Navbar from './component/Navbar/Navbar';
import MealPlanForm from './component/CreateMealplan/MealPlanForm';
import FetchMealPlans from './component/FetchMealPlans/FetchMealPlans';
import MealPlanUpdate from './component/MealPlanUpdate/MealPlanUpdate';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path='/createmeal' element={<MealPlanForm />} />
          <Route path='/viewmealplan' element={<FetchMealPlans />} />
          <Route path='/updatemealplan' element={<MealPlanUpdate />} />
          <Route path='/viewPost' element={<ViewPost />} />
          <Route path='/AddPost' element={<AddPost />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

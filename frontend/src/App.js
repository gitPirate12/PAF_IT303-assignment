import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import ViewPost from './component/SocialMediaPosts/viewPost';
import Navbar from './component/Navbar/Navbar';
import MealPlanForm from './component/CreateMealplan/MealPlanForm';
import FetchMealPlans from './component/FetchMealPlans/FetchMealPlans';
import MealPlanUpdate from './component/MealPlanUpdate/MealPlanUpdate';
import AddPost from './component/SocialMediaPosts/addPost';
import DeletePost from './component/SocialMediaPosts/deletePost';
import EditPost from './component/SocialMediaPosts/editPost';

function App() {
  return (
   <Router>
    <div>
      <Navbar />

      <Routes>
        <Route path='/createmeal' element={<MealPlanForm />} />
        <Route path='/viewmealplan' element={<FetchMealPlans />} />
        <Route path='/updatemealplan' element={<MealPlanUpdate />} />
        <Route path='/ViewPost' element={<ViewPost />} />
        <Route path='/AddPost' element={<AddPost />} />
        <Route path='/DeletePost' element={<DeletePost />} />
        <Route path='/EditPost/:postId' element={<EditPost />} />
      </Routes>
    </div>
   </Router>
  );
}

export default App;

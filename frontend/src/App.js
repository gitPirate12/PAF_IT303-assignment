import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import ViewPost from './component/SocialMediaPosts/viewPost';

import MealPlanForm from './component/CreateMealplan/MealPlanForm';
import FetchMealPlans from './component/FetchMealPlans/FetchMealPlans';
import MealPlanUpdate from './component/MealPlanUpdate/MealPlanUpdate';
import AddPost from './component/SocialMediaPosts/addPost';
import DeletePost from './component/SocialMediaPosts/deletePost';
import EditPost from './component/SocialMediaPosts/editPost';
import NavigationBarB from './component/NavigationBarB/NavigationBarB';
function App() {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    
   <Router>
    
    <NavigationBarB />
    <div>
    

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

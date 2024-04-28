
import './App.css';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AddPost from './components/SocialMediaPosts/addPost';

function App() {
  return (
 

  <Router>
      <div>
      
        <Routes>
        <Route path='/addPost' element={<AddPost />} />
          
        </Routes>
      </div>
      

    </Router>
    
  );
}

export default App;

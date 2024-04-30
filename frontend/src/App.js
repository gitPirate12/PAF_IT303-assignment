



import './App.css';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


import ViewPost from './components/SocialMediaPosts/viewPost';
import AddPost from './components/SocialMediaPosts/addPost';

function App() {
  return (

  <Router>
      <div>
      
        <Routes>
        <Route path='/viewPost' element={<ViewPost />} />
        <Route path='/AddPost' element={<AddPost />} />  
        </Routes>
      </div>
      

    </Router>  

  );
}

export default App;

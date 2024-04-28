
import './App.css';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


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

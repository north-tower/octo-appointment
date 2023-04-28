import Feed from './components/Feed';
import Register from './components/Register';
import Reset from './components/Reset';
import Login from './components/Login';
import TextBox from './components/TextBox';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './components/Home';
import Success from './components/Success';


function App() {
  return(
    <div >
      
       <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/reset" element={<Reset />} />
          <Route exact path="/feed" element={<Feed />} />
          <Route exact path="/post" element={<TextBox />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/success" element={<Success />} />


          

        </Routes>
      </Router>
    </div>
  );
}

export default App;

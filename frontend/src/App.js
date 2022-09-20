import "./App.css";
import Home from "./components/Home";
import About from "./components/About";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Alert from './components/Alert';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NoteState from "./context/NoteState"; //common context imported




function App() {
  return (
    <>
    <NoteState>
      <Router>
        <Navbar />
        <Alert/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
        </Routes>
      </Router>
    </NoteState>{/*importing the notestate to provide the access to the Context to all childs in between the tags*/}
    </>
  );
}

export default App;

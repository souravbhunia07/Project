import './App.css';
import {Route, Routes} from "react-router-dom"
import Main from "./Pages/Main/Main"
import Home from "./Pages/Home/Home"
import About from "./Pages/About/About"
import NewEvent from "./components/admin/NewEvent";
import Login from './components/registration_login/login';
import Events from './components/events/events';

function App() {
  return (
    <Routes>

      <Route path="/" element={<Main/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/events" element={<Events />}/>

      <Route path="/admin/event" element={<NewEvent />} />

    </Routes>
  );
}

export default App;

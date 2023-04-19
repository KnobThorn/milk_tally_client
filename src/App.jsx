import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
// import LoginGrader from "./pages/LoginGrader";
import Grading from "./pages/Grading";
import DashBoard from "./pages/DashBoard";
import Admin from "./pages/Admin";
import Details from "./pages/Details";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          {/* <Route path="/" element={<LoginGrader />} /> */}
          <Route path="/grade" element={<Grading />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/details" element={<Details />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

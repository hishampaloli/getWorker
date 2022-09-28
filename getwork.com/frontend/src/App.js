import "./App.css";
import Header from "./components/header/Header";
import Signup from "./Pages/signUpPage/Signup";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./Pages/LandingPage.js/Landing";
import Login from "./Pages/LoginPage/Login";
import EmployeeHome from "./Pages/EmployeePage/EmployeeHome.js/EmployeeHome";
import EmployerHome from "./Pages/EmployerPage/EmployerPage.js/EmployerHome";
import EmployeeProfile from "./Pages/EmployeePage/employeeProfile.js/EmployeeProfile";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/login" element={<Login />} />

          <Route exact path="/user/home" element={<EmployeeHome />} />
          <Route exact path="/user/profile" element={<EmployeeProfile />} />

          <Route exact path="/employer/home" element={<EmployerHome />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

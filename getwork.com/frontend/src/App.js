import "./App.css";
import Header from "./components/header/Header";
import Signup from "./Pages/signUpPage/Signup";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./Pages/LandingPage.js/Landing";
import Login from "./Pages/LoginPage/Login";
import EmployeeHome from "./Pages/EmployeePage/EmployeeHome.js/EmployeeHome";
import EmployerHome from "./Pages/EmployerPage/EmployerPage.js/EmployerHome";
import EmployeeProfile from "./Pages/EmployeePage/employeeProfile.js/EmployeeProfile";
import EmployeePublicView from "./Pages/EmployeePage/employeePublicView/employeePublicView";
import EmployerProfile from "./Pages/EmployerPage/EmployerProfile/EmployerProfile";
import FindTalentsPage from "./Pages/EmployerPage/FindTalentsPage/FindTalentsPage";
import AdminProfile from "./Pages/AdminPage/AdminHomePage/AdminPage";
import AdminUserPage from "./Pages/AdminPage/AdminFindUser/AdminUserPage";

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
          <Route exact path="/user/publicView/:userId" element={<EmployeePublicView />} />

          <Route exact path="/employer/home" element={<EmployerHome />} />
          <Route exact path="/employer/profile" element={<EmployerProfile />} />
          <Route exact path="/findTalents" element={<FindTalentsPage />} />

          <Route exact path="/admin/profile" element={<AdminProfile />} />
          <Route exact path="/admin/users" element={<AdminUserPage />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;

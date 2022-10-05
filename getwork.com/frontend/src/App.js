import "./App.css";

import React from "react";
import Header from "./components/header/Header";
import Signup from "./Pages/signUpPage/Signup";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import EmployeeHome from "./Pages/EmployeePage/EmployeeHome.js/EmployeeHome";
import EmployerHome from "./Pages/EmployerPage/EmployerPage.js/EmployerHome";
// import EmployeeProfile from "./Pages/EmployeePage/employeeProfile.js/EmployeeProfile";
import EmployeePublicView from "./Pages/EmployeePage/employeePublicView/employeePublicView";
import EmployerProfile from "./Pages/EmployerPage/EmployerProfile/EmployerProfile";
import FindTalentsPage from "./Pages/EmployerPage/FindTalentsPage/FindTalentsPage";
import AdminProfile from "./Pages/AdminPage/AdminHomePage/AdminProfile";
import AdminUserPage from "./Pages/AdminPage/AdminFindUser/AdminUserPage";
import AdminKyc from "./Pages/AdminPage/AdminKyc/AdminKyc";

const Landing = React.lazy(() => import("./Pages/AdminPage/AdminKyc/AdminKyc"));
const Login = React.lazy(() => import("./Pages/LoginPage/Login"));
const EmployeeProfile = React.lazy(() => import("./Pages/EmployeePage/employeeProfile.js/EmployeeProfile"));

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route exact path="/"  element={ <React.Suspense fallback='Loading...' ><Landing /></React.Suspense>} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/login" element={ <React.Suspense fallback='Loading...' ><Login /></React.Suspense>} />

          <Route exact path="/user/home" element={<EmployeeHome />} />
          <Route exact path="/user/profile" element={ <React.Suspense fallback='Loading...' ><EmployeeProfile /></React.Suspense>} />

          <Route
            exact
            path="/user/publicView/:userId"
            element={<EmployeePublicView />}
          />

          <Route exact path="/employer/home" element={<EmployerHome />} />
          <Route exact path="/employer/profile" element={<EmployerProfile />} />
          <Route exact path="/findTalents" element={<FindTalentsPage />} />

          <Route exact path="/admin/profile" element={<AdminProfile />} />
          <Route exact path="/admin/users" element={<AdminUserPage />} />
          <Route exact path="/admin/kyc" element={<AdminKyc />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

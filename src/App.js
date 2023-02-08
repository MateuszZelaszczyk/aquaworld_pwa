import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./HomePage/HomePage.js";
import LoginPage from "./LogInPage/LogIn.js"
import RegisterPage from "./RegisterPage/RegisterPage.js";
import RePassword from "./PasswordReset/RePassword.js";
import NewPassword from "./PasswordReset/NewPassword.js";
import MainPage from "./MainPage/MainPage.js";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/login" element={<LoginPage/>}/>
        <Route exact path="/register" element={<RegisterPage/>}/>
        <Route exact path="/repassword" element={<RePassword/>}/>
        <Route exact path="/newpassword" element={<NewPassword/>}/>
        <Route exact path="/mainpage" element={<MainPage/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

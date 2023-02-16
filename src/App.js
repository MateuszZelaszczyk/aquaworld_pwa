import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./HomePage/HomePage.js";
import LoginPage from "./LogInPage/LogIn.js"
import RegisterPage from "./RegisterPage/RegisterPage.js";
import RePassword from "./PasswordReset/RePassword.js";
import NewPassword from "./PasswordReset/NewPassword.js";
import MainPage from "./MainPage/MainPage.js";
import NewAqua from "./NewAqua/AddAqua.js";
import MyAqua from "./MyAqua/MyAqua.js";
import NewPost from "./AddPost/AddPost.js";
import AddFish from "./NewAqua/AddFish.js";
import AddEquipment from "./NewAqua/AddEquipment.js";
import AddPlants from "./NewAqua/AddPlants.js";
import AddBase from "./NewAqua/AddBase.js";
import AddFertilizer from "./NewAqua/AddFertilizer.js";
import MoreInformation from "./MoreInformations/MoreInformation.js";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/login" element={<LoginPage/>}/>
        <Route exact path="/register" element={<RegisterPage/>}/>
        <Route exact path="/repassword" element={<RePassword/>}/>
        <Route exact path="/newpassword" element={<NewPassword/>}/>
        <Route exact path="/profile/mainpage" element={<MainPage/>}/>
        <Route exact path="/profile/newaqua" element={<NewAqua/>}/>
        <Route exact path="/profile/myaqua" element={<MyAqua/>}/>
        <Route exact path="/profile/myaqua/add_fish/:id" element={<AddFish/>}/>
        <Route exact path="/profile/myaqua/add_plants/:id" element={<AddPlants/>}/>
        <Route exact path="/profile/myaqua/add_base/:id" element={<AddBase/>}/>
        <Route exact path="/profile/myaqua/add_equipment/:id" element={<AddEquipment/>}/>
        <Route exact path="/profile/myaqua/add_fertilizer/:id" element={<AddFertilizer/>}/>
        <Route exact path="/profile/newpost" element={<NewPost/>}/>
        <Route exact path="/profile/myaqua/moreinformations/:id" element={<MoreInformation/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

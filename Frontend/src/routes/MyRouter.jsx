import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PublicLayoutRoutes from "./PublicLayoutRoutes";
import PrivateLayoutRoutes from "./PrivateLayoutRoutes";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import UserProfile from "../pages/UserProfile/UserProfile";
import CreatePost from "../pages/Posts/CreatePost";
import UpdateProfile from "../pages/UserProfile/UpdateProfile";
import Home from "../pages/Posts/Home";
import FbProfile from "../pages/Facebook/FbProfile";
import { useSelector } from "react-redux";
import FbPage from "../pages/Facebook/FbPage";
import SampleWebHook from "../pages/Facebook/SampleWebHook";

const MyRouter = () => {
  const user = useSelector((state) => state.user);
  return (
    <Router>
      {console.log("user: ", user)}
      <Routes>
        <Route element={<PrivateLayoutRoutes />}>
          <Route path="/createPost" element={<CreatePost />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/updateProfile" element={<UpdateProfile />} />
          <Route path="/fb-profile" element={<FbProfile />} />
          <Route path="/fb-page" element={<FbPage />} />
          <Route path="fb-sample" element={<SampleWebHook />} />
        </Route>
        <Route element={<PublicLayoutRoutes />}>
          <Route path="/" element={<Home />} />
        </Route>
        {/* without Layout */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default MyRouter;

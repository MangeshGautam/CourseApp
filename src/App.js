import React, { useEffect, useState } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import Login from "./Pages/Authentication/Login";
import Register from "./Pages/Authentication/Register";
import Authentication from "./Layout/Authentication";
import MainPage from "./Layout/MainPage";
import PageNotFound from "./PageNotFound";
import Dashboard from "./Pages/MainPages/Home";
import Courses from "./Pages/MainPages/Courses";
import ForgotPass from "./Pages/Authentication/ForgetPass";
import { AddCall } from "@mui/icons-material";
import AddCourseForm from "./Pages/MainPages/AddCourseForm";
import CourseInfo from "./Pages/MainPages/CourseInfo";
import CourseContent from "./Components/CourseContent";
import ContentCourse from "./Pages/MainPages/ContentCourse";
import CourseList from "./Components/CourseList";
import Profile from "./Pages/MainPages/Profile";

function App() {
  const [userHasLogin, setUserHasLogin] = useState(false);

  const token= localStorage.getItem("token");


  useEffect(() => {
    
    if (token) {
      setUserHasLogin(true);
    } 
  }, [token]);
  // console.log(localStorage.getItem("token"))
  
  // console.log(token);
  // console.log(userHasLogin);

  const routes = useRoutes([
    {
      path: "/",
      element: <Authentication />,
      children: [
        {
          path: "/",
          element: <Navigate to={userHasLogin ? "/home" : "/login"} />,
        },
        { path: "/login", element: <Login /> },
        { path: "/register", element: <Register /> },
        { path: "/forgot", element: <ForgotPass /> },

        { path: "*", element: <PageNotFound /> },
      ],
    },{
      path: "/",
      element: <MainPage />,
      children: userHasLogin ?  [
        { path: "/home", element: <Dashboard /> },
        { path: "/courses", element: <ContentCourse /> },
        { path: "/courses/content", element: <CourseList /> },
        { path: "/addcourses", element: <AddCourseForm /> },
        { path: "/profile", element: <Profile /> },

        
     

      ]:[],
    }

    
   
  ]);

  return <>{routes}</>;
}

export default App;

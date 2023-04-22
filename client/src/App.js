import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from "react-router-dom";
import React, { useContext } from "react";
import Home from "./pages/home/Home"
import Profile from "./pages/profile/Profile";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { AuthContext } from "./context/AuthContext";
import Messenger from "./pages/messenger/Messenger";


function App() {
  const {user} = useContext(AuthContext)
  const route = createBrowserRouter([
    {
      path: "/",
      element: user?<Home/>:<Navigate to={"/login"}/>,
    },
    {
      path: "/:username",
      element : <Profile/>
    },
    {
      path:"/login",
      element:user? <Navigate to="/"/> : <Login/>
    },
    {
      path:"/register",
      element:user? <Navigate to="/"/> :<Register/>
    },
    {
      path:"/messenger",
      element:!user ? <Navigate to="/"/> :<Messenger/>
    },

  ]);
  return (
    <RouterProvider router={route} />
  )
}

export default App;

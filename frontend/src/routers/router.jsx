import {createBrowserRouter} from "react-router-dom";
import App from "../App";
import Home from "../components/Home/Home";
import Login from "../components/landingPage/ClientLogin";
import SignUp from "../components/landingPage/ClientSignUp";
import OwnerDashboard from "../pages/shopOwner/OwnerDashboard";
import OwnerDashboardLayout from "../pages/shopOwner/OwnerDashboardLayout";

function CreateRouter(){
  return createBrowserRouter([
    /*reservation routes*/
    {
      path: "/",
      element: <App/>,
      children:[
        {
          path:'/',
          element:<Home/>
        },
        {
          path:"/login",
          element:<Login/>
        },
        {
          path:"/signup",
          element:<SignUp/>
        }
      ]
    },

    {
      path: "/shopOwner/dashboard",
      element: <OwnerDashboardLayout/>,
      children:[
        {
          path:'/shopOwner/dashboard',
          element:<OwnerDashboard/>
        },
      ]
    }

  ]);
}
export default CreateRouter;
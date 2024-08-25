import {createBrowserRouter} from "react-router-dom";
import App from "../App";
import Home from "../components/Home/Home";
import Login from "../components/landingPage/ClientLogin";
import SignUp from "../components/landingPage/ClientSignUp";
import OwnerDashboard from "../pages/shopOwner/OwnerDashboard";
import OwnerDashboardLayout from "../pages/shopOwner/OwnerDashboardLayout";
import AddItem from "../pages/shopOwner/AddItem";
import DeleteItem from "../pages/shopOwner/DeleteItem";
import UpdateItem from "../pages/shopOwner/UpdateItem";
import ViewItem from "../pages/shopOwner/ViewItem";

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
        {
          path:'/shopOwner/dashboard/add-item',
          element:<AddItem/>
        },
        {
          path:'/shopOwner/dashboard/delete-items',
          element:<DeleteItem/>
        },
        {
          path: '/shopOwner/dashboard/update-item/:id',
          element:<UpdateItem/>
        },
        {
          path: '/shopOwner/dashboard/view-item/:id',
          element:<ViewItem/>
        },
      
      ]
    }

  ]);
}
export default CreateRouter;
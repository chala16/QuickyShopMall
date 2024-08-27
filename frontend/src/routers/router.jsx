import {createBrowserRouter} from "react-router-dom";
import App from "../App";
import Home from "../components/home/Home";
import Login from "../components/landingPage/ClientLogin";
import SignUp from "../components/landingPage/ClientSignUp";
import OwnerDashboardLayout from "../pages/shopOwner/OwnerDashboardLayout";
import AddItem from "../pages/shopOwner/AddItem";
import DeleteItem from "../pages/shopOwner/Inventory";
import UpdateItem from "../pages/shopOwner/UpdateItem";
import ViewItem from "../pages/shopOwner/ViewItem";
import Wishlist from "../pages/Wishlist";
import ClientDashboardLayout from "../pages/client/ClientDashboardLayout";
import Shops from "../pages/client/Shops";
import ShopItems from "../pages/client/ShopItems";
import ViewItemDetails from "../pages/client/ViewItemDetails";


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
        },
        {
          path:"/wishlist",
          element:<Wishlist/>
        }
      ]
    },

    {
      path: "/shopOwner/dashboard",
      element: <OwnerDashboardLayout/>,
      children:[
        {
          path:'/shopOwner/dashboard/add-item',
          element:<AddItem/>
        },
        {
          path:'/shopOwner/dashboard/view-items',
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
    },

    {
      path: "/client/dashboard",
      element: <ClientDashboardLayout/>,
      children:[
        {
          path:'/client/dashboard/shops',
          element:<Shops/>
        },
        {
          path:'/client/dashboard/view-items/:id',
          element:<ShopItems/>
        },
        {
          path:'/client/dashboard/view-item/:id',
          element:<ViewItemDetails/>
        },

      ]
    }

  ]);
}
export default CreateRouter;
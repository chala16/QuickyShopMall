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
import Wishlist from "../pages/client/Wishlist";
import ClientDashboardLayout from "../pages/client/ClientDashboardLayout";
import Shops from "../pages/client/Shops";
import ShopItems from "../pages/client/ShopItems";
import ViewItemDetails from "../pages/client/ViewItemDetails";
import FAQsPage from "../pages/client/FAQsPage";

import DiscountDashboard from "../pages/Discount/DiscountDashboard";
import AddDiscount from "../pages/Discount/AddDiscount";
import ViewDiscountItems from "../pages/Discount/ViewDiscountItems";
import UpdateDiscount from "../pages/Discount/UpdateDiscount";
import add from "../pages/Promotions/PromotionDashBoard";
import PromotionDashBoard from "../pages/Promotions/PromotionDashBoard";
import PromotionAdd from "../pages/Promotions/PromotionAdd";
import ViewallPromotions from "../pages/Promotions/ViewallPromotions";
import UpdatePromotion from "../pages/Promotions/UpdatePromotion";

import AddFAQ from "../pages/FAQ/addFaq"
import Reviews from "../pages/shopOwner/ViewReviews";

import Report from "../pages/shopOwner/Report";


function CreateRouter(){
  return createBrowserRouter([
    /*home routes*/
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
        {
          path: '/shopOwner/dashboard/report',
          element:<Report/>
        },
        {path:"/shopOwner/dashboard/reviews" ,
          element:<Reviews />
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
        {
          path:"/client/dashboard/wishlist",
          element:<Wishlist/>
        },
        {
          path: '/client/dashboard/faqs/:shopId/:shopName',
          element: <FAQsPage/>,
        },
        

      ]

    },

    {
      path: '/shopOwner/discounts', element: <DiscountDashboard />
    },
    {
      path: '/shopOwner/discounts/add-discount/:id', element: <AddDiscount />
    },
    {
      path: '/shopOwner/discounts/view-discount-items', element: <ViewDiscountItems />
    },
    {
      path: '/shopOwner/discounts/update-discount-item/:id/:itemId', element: <UpdateDiscount />
    },
    {
      path: '/shopOwner/promotion', element: <PromotionDashBoard />
    },
    {
      path: '/shopOwner/promotion/add-promotion/:id', element: <PromotionAdd />
    },
    {
      path: '/shopOwner/promotion/view-promotion/:id', element: <ViewallPromotions />
    },
    {
      path: '/shopOwner/promotion/update-promotion/:id', element: <UpdatePromotion />
    },
    

    {
      path: '/shopOwner/faqs',  element: <AddFAQ/>

    },
  ]);
}
export default CreateRouter;
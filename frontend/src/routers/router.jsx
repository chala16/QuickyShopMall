import {createBrowserRouter} from "react-router-dom";
import App from "../App";
import Home from "../components/Home/Home";
import Login from "../components/landingPage/ClientLogin";
import SignUp from "../components/landingPage/ClientSignUp";

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

  ]);
}
export default CreateRouter;
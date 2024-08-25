import { RouteObject } from "react-router-dom";
import Home from "./pages/Home";

const Routes: RouteObject[] = [
    {
        path: "/",
        element: <Home/>
    }
]

export default Routes;
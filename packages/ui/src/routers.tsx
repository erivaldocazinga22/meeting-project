import { createBrowserRouter } from "react-router-dom";
import { App } from "./pages/App";
import { Meeting } from "./pages/meeting";

export const Routers = createBrowserRouter([
    {
        path: "/",
        element: <App />
    },
    {
        path: "/meeting",
        element: <Meeting />
    },
])
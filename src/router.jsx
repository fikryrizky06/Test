import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./pages/User/Login";
import Profile from "./pages/User/Profile";
import Dashboard from "./pages/Dashboard";
import Stuff from "./pages/Stuff";
import TrashStuff from "./pages/TrashStuff";
import Inbound from "./pages/Inbound";
// import Create from "./page/stuff/create";
// import InboundCreate from "./pages/Inbound/Create";

export const router = createBrowserRouter([
    { path: '/', element: <App /> },
    { path: '/login', element: <Login /> },
    { path: '/profile', element: <Profile /> },
    { path: '/dashboard', element: <Dashboard /> },
    { path: '/stuff', element: <Stuff /> },
    { path: '/stuff/trash', element: <TrashStuff /> },
    { path: '/inbound-stuff', element: <Inbound /> },
    // { path: '/stuff/create', element: <Create /> },
    // { path: '/inbound/create', element: <InboundCreate /> },
])


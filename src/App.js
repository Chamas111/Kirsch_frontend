import { Calendar, momentLocalizer } from "react-big-calendar";
import {
  Routes,
  Route,
  RouterProvider,
  Link,
  Outlet,
  createBrowserRouter,
} from "react-router-dom";
import moment from "moment";

import "react-big-calendar/lib/css/react-big-calendar.css";
import CalendarPage from "./components/CalendarPage";
import NewAuftrag from "./components/NewAuftrag";
import AuftragDetails from "./components/AuftragDetails";
import UpdateAuftrag from "./components/UpdateAuftrag";
import Home from "./pages/home/Home";
import User from "./pages/user/User";
import Kalendar from "./pages/kalendar/Kalendar";
import Kva from "./pages/kva/Kva";
import Hvz from "./pages/hvz/Hvz";
import Rechnungen from "./pages/rechnungen/Rechnungen";
import Ausgaben from "./pages/ausgaben/Ausgaben";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Menu from "./components/menu/Menu";
import Lagerung from "./pages/lagerung/Lagerung";
import Login from "./pages/login/Login";
import "./styles/global.css";
const localizer = momentLocalizer(moment);

function App() {
  const Layout = () => {
    return (
      <div className="main">
        <Navbar />
        <div className="container">
          <div className="menuContainer">
            <Menu />
          </div>
          <div className="contentContainer">
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,

      children: [
        {
          path: "/",
          element: <Home />,
        },
        { path: "/user", element: <User /> },
        { path: "/kalendar", element: <Kalendar /> },
        ,
        {
          path: "/hvz",
          element: <Hvz />,
        },
        {
          path: "/rechnungen",
          element: <Rechnungen />,
        },
        {
          path: "/kva",
          element: <Kva />,
        },
        {
          path: "/ausgaben",
          element: <Ausgaben />,
        },
        {
          path: "/lagerung",
          element: <Lagerung />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;

import { useState } from "react";
import {
  Routes,
  Route,
  BrowserRouter,
  Navigate,
  Outlet,
} from "react-router-dom";
import moment from "moment";
import { momentLocalizer } from "react-big-calendar";

import "react-big-calendar/lib/css/react-big-calendar.css";
import CalendarPage from "./components/CalendarPage";
import NewAuftrag from "./components/NewAuftrag";
import AuftragDetails from "./components/AuftragDetails";
import UpdateAuftrag from "./components/UpdateAuftrag";
import Auftraege from "./components/Auftraege";

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
import Register from "./pages/register/Register";

const localizer = momentLocalizer(moment);

const Layout = ({ isLoggedin, setIsLoggedin }) => {
  return (
    <div className="main">
      <Navbar isLoggedin={isLoggedin} setIsLoggedin={setIsLoggedin} />
      <div className="container">
        <div className="menuContainer">
          <Menu />
        </div>
        <div className="contentContainer">
          <Outlet /> {/* Pages go here */}
        </div>
      </div>
      <Footer />
    </div>
  );
};

// PrivateRoute now renders Layout + children
const PrivateRoute = ({ isLoggedin }) => {
  return isLoggedin ? <Outlet /> : <Navigate to="/login" />;
};
function App() {
  const [isLoggedin, setIsLoggedin] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route
          path="/login"
          element={<Login setIsLoggedin={setIsLoggedin} />}
        />
        <Route path="/register" element={<Register />} />

        {/* Private */}
        <Route element={<PrivateRoute isLoggedin={isLoggedin} />}>
          <Route
            element={
              <Layout isLoggedin={isLoggedin} setIsLoggedin={setIsLoggedin} />
            }
          >
            <Route path="/" element={<Home />} />
            <Route path="/user" element={<User />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/calendar/new" element={<NewAuftrag />} />
            <Route path="/auftrag/:id" element={<AuftragDetails />} />
            <Route path="/hvz" element={<Hvz />} />
            <Route path="/rechnungen" element={<Rechnungen />} />
            <Route path="/kva" element={<Kva />} />
            <Route path="/ausgaben" element={<Ausgaben />} />
            <Route path="/lagerung" element={<Lagerung />} />
          </Route>
        </Route>

        {/* 404 fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

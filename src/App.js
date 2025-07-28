import { Calendar, momentLocalizer } from "react-big-calendar";
import { Routes, Route } from "react-router-dom";
import moment from "moment";

import "react-big-calendar/lib/css/react-big-calendar.css";
import CalendarPage from "./components/CalendarPage";
import NewAuftrag from "./components/NewAuftrag";
import AuftragDetails from "./components/AuftragDetails";
import UpdateAuftrag from "./components/UpdateAuftrag";

const localizer = momentLocalizer(moment);

function App() {
  return (
    <Routes>
      <Route path="/" element={<CalendarPage />} />
      <Route path="/new-auftrag" element={<NewAuftrag />} />
      <Route path="/auftrag/:id" element={<AuftragDetails />} />
      <Route path="/auftraege/:id/update" element={<UpdateAuftrag />} />
    </Routes>
  );
}

export default App;

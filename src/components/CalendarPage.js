import { useState, useEffect } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

function CalendarPage() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState(Views.MONTH);
  // ✅ Fetch events from the backend
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_BASE_URL}/api/auftraege`)
      .then((res) => {
        // Convert date strings to JS Date objects
        const loadedEvents = res.data.map((e) => ({
          ...e,
          start: new Date(e.start),
          end: new Date(e.end),
        }));
        setEvents(loadedEvents);
      })
      .catch((err) => console.error("Error fetching events:", err));
  }, []);

  const handleSelectSlot = async (slotInfo) => {
    // 1. Create Event in backend
    const newEvent = {
      title: "New Event",
      start: slotInfo.start,
      end: moment(slotInfo.start).add(1, "hour").toDate(),
    };

    const res = await axios.post(
      `${process.env.REACT_APP_SERVER_BASE_URL}/api/events`,
      newEvent
    );

    // 2. Redirect to Auftrag form with eventId
    navigate("/new-auftrag", {
      state: { eventId: res.data._id },
    });
  };
  const handleSelectEvent = (event) => {
    navigate(`/auftrag/${event._id}`);
  };

  return (
    <div style={{ height: "500px", margin: "50px" }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        style={{ height: 600 }}
        views={[Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]} // ✅ Enable all views
        view={currentView}
        onView={(view) => setCurrentView(view)} // ✅ Track current view
        defaultView={Views.MONTH}
      />
    </div>
  );
}

export default CalendarPage;

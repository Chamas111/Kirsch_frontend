import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

function AuftragDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const printRef = useRef(null);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_BASE_URL}/api/auftraege/${id}`, {
        withCredentials: true,
      })
      .then((res) => setEvent(res.data))
      .catch((err) => console.error("Error fetching event:", err));
  }, [id]);

  const handleDownload = async () => {
    if (!printRef.current) return;

    // Small delay to ensure rendering is complete
    await new Promise((resolve) => setTimeout(resolve, 200));

    const canvas = await html2canvas(printRef.current, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff", // ensure white background
      ignoreElements: (el) => el.classList.contains("no-print"),
    });

    const data = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "pt", "a4");

    const imgProps = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`auftrag-${event?._id || "details"}.pdf`);
  };

  if (!event) return <p>Loading...</p>;

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await axios.delete(
          `${process.env.REACT_APP_SERVER_BASE_URL}/api/auftraege/${id}`,
          { withCredentials: true }
        );
        alert("Event deleted successfully!");
        navigate("/calendar");
      } catch (error) {
        console.error("Error deleting event:", error);
      }
    }
  };

  return (
    <>
      <div
        style={{
          padding: 20,
          fontSize: "24px",
          color: "#000",
          maxWidth: "800px",
        }}
        ref={printRef}
      >
        <h2>Auftrag Details</h2>

        <p>
          <strong>Title:</strong> {event.title}
        </p>
        <p className="no-print">
          <strong>Start:</strong> {new Date(event.start).toLocaleString()}
        </p>
        <p className="no-print">
          <strong>End:</strong> {new Date(event.end).toLocaleString()}
        </p>

        <p>
          <strong>Datum:</strong> {event.datum}
        </p>
        <p>
          <strong>Uhrzeit:</strong> {event.uhrZeit}
        </p>
        <p>
          <strong>Kunde:</strong> {event.kundeName}
        </p>
        <p>
          <strong>tele:</strong> {event.tel}
        </p>
        <p>
          <strong>Auszug Adresse:</strong> {event.auszugsadresse}
        </p>
        <p>
          <strong>Etage:</strong> {event.auszugsEtage}
        </p>
        <p>
          <strong>Aufzug:</strong> {event.auszugsAufzug}
        </p>
        <p>
          <strong>Einzug Adresse:</strong> {event.einzugsadresse}
        </p>
        <p>
          <strong>Etage:</strong> {event.einzugsEtage}
        </p>
        <p>
          <strong>Aufzug:</strong> {event.einzugsAufzug}
        </p>
        <p>
          <strong>Preis:</strong> {event.preis}
        </p>
        <p>
          <strong>HVZ:</strong> {event.hvz}
        </p>
        <p>
          <strong>Payment Method:</strong> {event.bezahlMethod}
        </p>
        <p>
          <strong>Bemerkungen:</strong> {event.bemerkungen}
        </p>
      </div>
      <div>
        <button
          onClick={() => navigate(`/auftraege/${id}/update`)}
          className="btn btn-success"
        >
          Update
        </button>
        <button
          style={{ marginLeft: "10px", color: "white" }}
          onClick={handleDelete}
          className="btn btn-danger"
        >
          Delete
        </button>
        <button
          style={{ marginLeft: "10px", color: "white" }}
          onClick={() => navigate(`/`)}
          className="btn btn-secondary"
        >
          Züruck
        </button>
        <button
          style={{ marginLeft: "10px", color: "white" }}
          onClick={handleDownload}
          className="btn btn-secondary"
        >
          Download
        </button>
      </div>
    </>
  );
}

export default AuftragDetails;

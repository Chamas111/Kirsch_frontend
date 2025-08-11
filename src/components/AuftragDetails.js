import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useRef } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

function AuftragDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [Auftraege, setAuftraege] = useState([]);
  const [event, setEvent] = useState(null);
  const printRef = useRef(null);

  const [title, setTitle] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [datum, setDatum] = useState("");
  const [uhrZeit, setUhrZeit] = useState("");
  const [kundeName, setKundeName] = useState("");
  const [auszugsadresse, setAuszugsadresse] = useState("");
  const [auszugsEtage, setAuszugsEtage] = useState("");
  const [auszugsAufzug, setAuszugsAufzug] = useState("");
  const [einzugsadresse, setEinzugsadresse] = useState("");
  const [einzugsEtage, setEinzugsEtage] = useState("");
  const [einzugsAufzug, setEinzugsAufzug] = useState("");
  const [preis, setPreis] = useState("");
  const [hvz, setHvz] = useState("");
  const [bezahlMethod, setBezahlMethod] = useState("Bezahlung in bar");
  const [bemerkungen, setBemerkungen] = useState("");
  const [tel, setTel] = useState("");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_BASE_URL}/api/auftraege/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setEvent(res.data);
        setTitle(res.data.title);
        setStart(res.data.start);
        setEnd(res.data.end);
        setDatum(res.data.datum);
        setUhrZeit(res.data.uhrZeit);
        setKundeName(res.data.kundeName);
        setTel(res.data.tel);
        setAuszugsadresse(res.data.auszugsadresse);
        setAuszugsEtage(res.data.auszugsEtage);
        setAuszugsAufzug(res.data.auszugsAufzug);
        setEinzugsadresse(res.data.einzugsadresse);
        setEinzugsEtage(res.data.einzugsEtage);
        setEinzugsAufzug(res.data.einzugsAufzug);
        setPreis(res.data.preis);
        setHvz(res.data.hvz);
        setBezahlMethod(res.data.bezahlMethod);
        setBemerkungen(res.data.bemerkungen);
      })
      .catch((err) => console.error("Error fetching event:", err));
  }, [id]);

  // const handleUpdate = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await axios.put(
  //       `${process.env.REACT_APP_SERVER_BASE_URL}/api/auftraege/${id}`,
  //       {
  //         title,
  //         start,
  //         end,
  //         kundeName,

  //         datum,
  //         uhrZeit,
  //         kundeName,
  //         tel,
  //         auszugsadresse,
  //         auszugsEtage,
  //         auszugsAufzug,
  //         einzugsadresse,
  //         einzugsEtage,
  //         einzugsAufzug,
  //         preis,
  //         hvz,
  //         bezahlMethod,
  //         bemerkungen,
  //       }
  //     );
  //     alert("Event updated successfully!");
  //     setIsEditing(false);
  //     navigate("/");
  //   } catch (error) {
  //     console.error("Error updating event:", error);
  //   }
  // };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await axios.delete(
          `${process.env.REACT_APP_SERVER_BASE_URL}/api/auftraege/${id}`,
          { withCredentials: true }
        );
        alert("Event deleted successfully!");
        navigate("/");
      } catch (error) {
        console.error("Error deleting event:", error);
      }
    }
  };

  const handleDownload = async () => {
    const element = printRef.current;
    if (!element) {
      return;
    }
    const canvas = await html2canvas(element, { scale: 2 });
    const data = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: "a4",
    });

    const imgProperties = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;
    pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("example.pdf");
  };

  if (!event) return <p>Loading...</p>;

  return (
    <>
      <div style={{ padding: 20, fontSize: "24px" }} ref={printRef}>
        <h2>Auftrag Details</h2>

        <p>
          <strong>Title:</strong> {event.title}
        </p>
        <p>
          <strong>Start:</strong> {new Date(event.start).toLocaleString()}
        </p>
        <p>
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

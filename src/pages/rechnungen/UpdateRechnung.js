import { useState, useEffect } from "react";
import axios from "../../axiosinstance";
import { useNavigate, useParams, useLocation } from "react-router-dom";

function UpdateRechnung() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const preselectedDate = location.state?.selectedDate || "";

  const [rechnungsDatum, setRechnungsDatum] = useState(preselectedDate);
  const [status, setStatus] = useState("");
  const [rechnungsNummer, setRechnungsNummer] = useState("");
  const [kundeName, setKundeName] = useState("");

  const [nettoBetrag, setNettoBetrag] = useState("");
  const [mwst, setMwst] = useState("");
  const [brutto, setBrutto] = useState("");
  const VAT_RATE = 0.19; // 19%

  // Load existing Rechnung
  useEffect(() => {
    const fetchRechnung = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_SERVER_BASE_URL}/api/invoices/${id}`,
          { withCredentials: true }
        );
        const rechnung = res.data;

        setRechnungsDatum(formatDate(rechnung.rechnungsDatum));
        setRechnungsNummer(rechnung.rechnungsNummer || "");
        setStatus(rechnung.status || "");
        setKundeName(rechnung.kundeName || "");
        setNettoBetrag(rechnung.nettoBetrag || 0);

        const nettoValue = Number(rechnung.nettoBetrag) || 0;
        const calculatedMwst = nettoValue * VAT_RATE;
        const calculatedBrutto = nettoValue + calculatedMwst;

        setMwst(calculatedMwst.toFixed(2));
        setBrutto(calculatedBrutto.toFixed(2));
      } catch (err) {
        console.error("Error loading Rechnung:", err);
      }
    };
    fetchRechnung();
  }, [id]);

  // Format date to dd.mm.yyyy
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const dateObj = new Date(dateString);
    return dateObj
      .toLocaleDateString("de-DE")
      .split(".")
      .map((part) => part.padStart(2, "0"))
      .join(".");
  };

  // Handle Netto input changes
  const handleNettoChange = (e) => {
    const input = e.target.value.replace(",", ".").replace("€", "");
    const nettoValue = parseFloat(input) || 0;
    setNettoBetrag(nettoValue);

    const calculatedMwst = nettoValue * VAT_RATE;
    const calculatedBrutto = nettoValue + calculatedMwst;

    setMwst(calculatedMwst.toFixed(2));
    setBrutto(calculatedBrutto.toFixed(2));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const [day, month, year] = rechnungsDatum.split(".");
    const isoDate = new Date(`${year}-${month}-${day}`);

    const updatedRechnung = {
      rechnungsDatum: isoDate,
      status,
      kundeName,
      rechnungsNummer,
      nettoBetrag: Number(nettoBetrag),
      mwst: Number(mwst),
      brutto: Number(brutto),
    };

    try {
      await axios.put(
        `${process.env.REACT_APP_SERVER_BASE_URL}/api/invoices/${id}`,
        updatedRechnung,
        { withCredentials: true }
      );
      navigate("/rechnungen");
    } catch (err) {
      console.error("Error updating Rechnung:", err);
    }
  };

  return (
    <>
      <h2 className="mx-auto p-2">Rechnung bearbeiten</h2>
      <div className="d-flex justify-content-center mx-auto p-2">
        <form onSubmit={handleSubmit}>
          {/* Datum */}
          <div className="row mb-3 p-2">
            <label className="col-sm-4 col-form-label fw-bold">Datum</label>
            <div className="col-sm-10 col-md-6">
              <input
                pattern="\d{2}\.\d{2}\.\d{4}"
                required
                type="text"
                placeholder="dd.mm.yyyy"
                className="form-control"
                value={rechnungsDatum}
                onChange={(e) => setRechnungsDatum(e.target.value)}
              />
            </div>
          </div>

          {/* RechnungsNummer */}
          <div className="row mb-3 p-2">
            <label className="col-sm-4 col-form-label fw-bold">
              Rechnungs Nummer
            </label>
            <div className="col-sm-10 col-md-6">
              <input
                type="text"
                className="form-control"
                value={rechnungsNummer}
                onChange={(e) => setRechnungsNummer(e.target.value)}
              />
            </div>
          </div>

          {/* Status */}
          <div className="row mb-3 align-items-center p-2">
            <label className="col-sm-2 col-form-label fw-bold">Status</label>
            <div className="col-sm-10 col-md-8">
              <select
                name="status"
                className="form-select form-control"
                value={status}
                onChange={(e) => setStatus(e.target.value.trim())}
              >
                <option value="Überweisung">Überweisung</option>
                <option value="Bezahlt">Bezahlt</option>
                <option value="Cash">Cash</option>
                <option value="Storniert">Storniert</option>
              </select>
            </div>
          </div>

          {/* Kunde */}
          <div className="row mb-3 align-items-center p-2">
            <label className="col-sm-4 col-form-label fw-bold">Kunde</label>
            <div className="col-sm-10 col-md-6">
              <input
                type="text"
                className="form-control"
                value={kundeName}
                onChange={(e) => setKundeName(e.target.value)}
              />
            </div>
          </div>

          {/* Netto Betrag */}
          <div className="row mb-3 p-1">
            <label className="col-sm-4 col-form-label fw-bold">Betrag</label>
            <div className="col-sm-10 col-md-10">
              <input
                type="number"
                placeholder="ex. 120"
                className="form-control"
                value={nettoBetrag}
                onChange={handleNettoChange}
              />
            </div>
          </div>

          {/* MwSt */}
          <div className="row mb-3 p-1">
            <label className="col-sm-4 col-form-label fw-bold">MwSt</label>
            <div className="col-sm-10 col-md-10">
              <input
                type="text"
                className="form-control"
                value={`${mwst} €`}
                readOnly
                style={{ backgroundColor: "gray", cursor: "not-allowed" }}
              />
            </div>
          </div>

          {/* Brutto */}
          <div className="row mb-3 p-1">
            <label className="col-sm-4 col-form-label fw-bold">Brutto</label>
            <div className="col-sm-10 col-md-10">
              <input
                type="text"
                className="form-control"
                value={`${brutto} €`}
                readOnly
                style={{ backgroundColor: "gray", cursor: "not-allowed" }}
              />
            </div>
          </div>

          {/* Buttons */}
          <button type="submit" className="btn btn-primary">
            Update Rechnung
          </button>
          <button
            type="button"
            onClick={() => navigate("/rechnungen")}
            className="btn btn-secondary"
            style={{ marginLeft: "10px", color: "white" }}
          >
            Cancel
          </button>
        </form>
      </div>
    </>
  );
}

export default UpdateRechnung;

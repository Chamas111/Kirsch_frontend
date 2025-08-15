import { useState } from "react";
import axios from "../../axiosinstance";
import { useLocation, useNavigate } from "react-router-dom";

function NewRechnung() {
  const location = useLocation();
  const navigate = useNavigate();

  const preselectedDate = location.state?.selectedDate || "";

  // ✅ Default values are now correct
  const [rechnungsDatum, setRechnungsDatum] = useState(preselectedDate);
  const [status, setStatus] = useState("Überweisung");
  const [rechnungsNummer, setRechnungsNummer] = useState("");
  const [kundeName, setKundeName] = useState("");

  const [nettoBetrag, setNettoBetrag] = useState("");
  const [mwst, setMwst] = useState("");
  const [brutto, setBrutto] = useState("");
  const VAT_RATE = 0.19; // 19%
  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Check date format before sending
    if (!/^\d{2}\.\d{2}\.\d{4}$/.test(rechnungsDatum)) {
      alert("Bitte geben Sie das Datum im Format TT.MM.JJJJ ein");
      return;
    }

    const [day, month, year] = rechnungsDatum.split(".");
    const isoDate = new Date(`${year}-${month}-${day}`);

    // ✅ Convert number fields properly
    const newRechnung = {
      rechnungsDatum: isoDate,
      rechnungsNummer: rechnungsNummer.trim(),
      kundeName,
      status: status.trim(),
      nettoBetrag: Number(nettoBetrag),
      mwst: Number(mwst),
      brutto: Number(brutto),
    };

    try {
      await axios.post(
        `${process.env.REACT_APP_SERVER_BASE_URL}/api/invoices`,
        newRechnung,
        { withCredentials: true }
      );
      navigate("/rechnungen");
    } catch (err) {
      console.error("❌ Error creating rechnung:", err.response?.data || err);
      alert(
        "Fehler beim Erstellen der Rechnung. Bitte prüfen Sie die Eingaben."
      );
    }
  };

  const handleNettoChange = (e) => {
    const nettoValue = parseFloat(e.target.value) || 0;
    setNettoBetrag(nettoValue);

    const calculatedMwst = nettoValue * VAT_RATE;
    const calculatedBrutto = nettoValue + calculatedMwst;

    // Round to 2 decimals
    setMwst(calculatedMwst.toFixed(2));
    setBrutto(calculatedBrutto.toFixed(2));
  };
  return (
    <>
      <h2 className="mx-auto p-2">Einen neuen Rechnung hinzufügen</h2>
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
                required
              />
            </div>
          </div>
          <div className="row mb-3 p-2">
            <label className="col-sm-4 col-form-label fw-bold">
              Kunde Name
            </label>
            <div className="col-sm-10 col-md-6">
              <input
                type="text"
                className="form-control"
                value={kundeName}
                onChange={(e) => setKundeName(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Status */}
          <div className="row mb-3 align-items-center p-2">
            <label
              htmlFor="inputStatus"
              className="col-sm-2 col-form-label fw-bold"
            >
              Status
            </label>
            <div className="col-sm-10 col-md-8">
              <select
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

          {/* NettoBetrag */}
          <div className="row mb-3 p-1">
            <label className="col-sm-4 col-form-label fw-bold">Netto</label>
            <div className="col-sm-10 col-md-10">
              <input
                type="number"
                placeholder="ex. 120"
                className="form-control"
                value={nettoBetrag}
                onChange={handleNettoChange}
                required
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
                value={mwst}
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
                value={brutto}
                readOnly
                style={{ backgroundColor: "gray", cursor: "not-allowed" }}
              />
            </div>
          </div>

          {/* Buttons */}
          <button type="submit" className="btn btn-primary">
            Add Rechnung
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

export default NewRechnung;

import { useState } from "react";
import axios from "../../axiosinstance";
import { useLocation, useNavigate } from "react-router-dom";

function NewHvz() {
  const location = useLocation();
  const navigate = useNavigate();
  const eventId = location.state?.eventId;
  // ✅ Pre-fill date if passed from Calendar
  const preselectedDate = location.state?.selectedDate || "";

  const [kundeName, setKundeName] = useState("");
  const [straße, setStraße] = useState("");

  const [datum, setDatum] = useState("");
  const [status, setStatus] = useState("Nicht bestellt");

  const [hvzName, setHvzName] = useState("");

  const [classification, setClassification] = useState("Privat");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newHvz = {
      kundeName,
      datum,
      straße,
      status,
      classification,
      hvzName,
    };

    await axios.post(
      `${process.env.REACT_APP_SERVER_BASE_URL}/api/hvzs`,
      newHvz,
      {
        withCredentials: true, // send cookies
      }
    );

    navigate("/hvz");
  };

  return (
    <>
      <h2 className="mx-auto p-2">Einen neuen HVZ hinzufügen</h2>
      <div className="d-flex justify-content-center mx-auto p-2 ">
        <form onSubmit={handleSubmit}>
          <div className="row mb-3 p-2">
            <label
              htmlFor="inputdatum"
              className="col-sm-4 col-form-label fw-bold"
            >
              Datum
            </label>
            <div className="col-sm-10 col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="dd.mm.yyyy"
                value={datum}
                onChange={(e) => setDatum(e.target.value)}
              />
            </div>
          </div>
          <div className="row mb-3 align-items-center p-2">
            <label
              htmlFor="inputClassification"
              className="col-sm-4 col-form-label fw-bold"
            >
              Classification
            </label>

            <div className="col-sm-10 col-md-6">
              <select
                className="form-select w-100"
                value={classification}
                onChange={(e) => setClassification(e.target.value)}
              >
                <option value="Privat">Privat</option>
                <option value="Rechnung">Rechnung</option>
              </select>
            </div>
          </div>
          <div className="row mb-3 p-1">
            <label
              htmlFor="inputAdresse"
              className="col-sm-4 col-form-label fw-bold"
            >
              Adresse
            </label>
            <div className="col-sm-10 col-md-10">
              <input
                type="text"
                className="form-control"
                value={straße}
                onChange={(e) => setStraße(e.target.value)}
              />
            </div>
          </div>
          <div className="row mb-3 p-1">
            <label
              htmlFor="kundeName"
              className="col-sm-4 col-form-label fw-bold"
            >
              kunde
            </label>

            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                value={kundeName}
                onChange={(e) => setKundeName(e.target.value)}
              />
            </div>
          </div>

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
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Nicht bestellt">Nicht bestellt</option>
                <option value="Bestellt">Bestellt</option>
                <option value="Genehmigt">Genehmigt</option>
                <option value="Abgelehnt">Abgelehnt</option>
              </select>
            </div>
          </div>

          <button type="submit" className="btn btn-primary">
            Add HVZ
          </button>
          <button
            type="button"
            onClick={() => navigate("/hvz")}
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

export default NewHvz;

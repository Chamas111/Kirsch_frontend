import { useState } from "react";
import axios from "../../axiosinstance";
import { useLocation, useNavigate } from "react-router-dom";

function NewLager() {
  const location = useLocation();
  const navigate = useNavigate();
  const eventId = location.state?.eventId;
  // ✅ Pre-fill date if passed from Calendar
  const preselectedDate = location.state?.selectedDate || "";

  const [kundeName, setKundeName] = useState("");
  const [lager, setLager] = useState("");

  const [datum, setDatum] = useState("");

  const [employeeName, setEmployeeName] = useState("");

  const [notitz, setNotitz] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newHvz = {
      kundeName,
      datum,
      lager,
      employeeName,
      notitz,
    };

    await axios.post(
      `${process.env.REACT_APP_SERVER_BASE_URL}/api/lagerungs`,
      newHvz,
      {
        withCredentials: true, // send cookies
      }
    );

    navigate("/lagerung");
  };

  return (
    <>
      <h2 className="mx-auto p-2 pt-5 mt-5">Einen neuen Lager hinzufügen</h2>
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
              htmlFor="inputkunde"
              className="col-sm-4 col-form-label fw-bold"
            >
              kunde
            </label>

            <div className="col-sm-10 col-md-6">
              <input
                type="text"
                className="form-control"
                value={kundeName}
                onChange={(e) => setKundeName(e.target.value)}
              />
            </div>
          </div>
          <div className="row mb-3 p-1">
            <label
              htmlFor="inputLagerPlace"
              className="col-sm-4 col-form-label fw-bold"
            >
              Lager Place
            </label>
            <div className="col-sm-10 col-md-10">
              <input
                type="text"
                className="form-control"
                value={lager}
                onChange={(e) => setLager(e.target.value)}
              />
            </div>
          </div>
          <div className="row mb-3 p-1">
            <label
              htmlFor="mitarbeiter"
              className="col-sm-4 col-form-label fw-bold"
            >
              Mitarbeiter
            </label>

            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                value={employeeName}
                onChange={(e) => setEmployeeName(e.target.value)}
              />
            </div>
          </div>

          <div className="row mb-3 align-items-center p-2">
            <label htmlFor="Notitz" className="form-label fw-bold">
              Notitz
            </label>
            <textarea
              type="text"
              name="message"
              rows="10"
              cols="30"
              className="form-control"
              value={notitz}
              onChange={(e) => setNotitz(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Add Lager
          </button>
          <button
            type="button"
            onClick={() => navigate("/lagerung")}
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

export default NewLager;

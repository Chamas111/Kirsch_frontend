import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";

function UpdateAuftrag() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [auftrag, setAuftrag] = useState({
    title: "",
    datum: "",
    uhrZeit: "",
    kundeName: "",
    tel: "",
    auszugsadresse: "",
    auszugsEtage: "",
    auszugsAufzug: "ohne Aufzug",
    einzugsadresse: "",
    einzugsEtage: "",
    einzugsAufzug: "ohne Aufzug",
    preis: "",
    hvz: "",
    bezahlMethod: "",
    bemerkungen: "",
  });

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_BASE_URL}/api/auftraege/${id}`, {
        withCredentials: true,
      })

      .then((res) => setAuftrag(res.data))
      .catch((e) => console.log(e));
  }, [id]);

  const handleChange = (e) => {
    const { name, type, checked } = e.target;

    setAuftrag((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
            ? "mit Aufzug"
            : "ohne Aufzug"
          : e.target.value,
    }));
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    axios
      .put(
        `${process.env.REACT_APP_SERVER_BASE_URL}/api/auftraege/${id}`,
        auftrag,
        { withCredentials: true }
      )

      .then((res) => navigate("/"))
      .catch((e) => console.log(e));
  };
  return (
    <>
      <h2 className="mx-auto p-2">Update Auftrag </h2>
      <div className="d-flex justify-content-center mx-auto p-2">
        <form onSubmit={handelSubmit}>
          <div className="row mb-3">
            <label
              htmlFor="inputtitle"
              className="col-sm-2 col-form-label fw-bold"
            >
              title
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                name="title"
                value={auftrag.title}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row mb-3">
            <label
              htmlFor="inputDatum"
              className="col-sm-2 col-form-label fw-bold"
            >
              Datum
            </label>

            <div className="col-sm-10">
              <input
                type="Date"
                className="form-control"
                name="datum"
                value={auftrag.datum}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row mb-3">
            <label
              htmlFor="inputZeit"
              className="col-sm-2 col-form-label fw-bold"
            >
              Uhrzeit
            </label>
            <div className="col-sm-10">
              <input
                type="time"
                className="form-control"
                name="uhrZeit"
                value={auftrag.uhrZeit}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row mb-3">
            <label
              htmlFor="inputKunde"
              className="col-sm-2 col-form-label fw-bold"
            >
              Kunde
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                name="kundeName"
                value={auftrag.kundeName}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row mb-3 ">
            <label
              htmlFor="inputTele"
              className="col-sm-2 col-form-label fw-bold"
            >
              Tele
            </label>
            <div className="col-sm-10">
              <input
                type="number"
                className="form-control "
                value={auftrag.tel}
                name="tel"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="container mt-4 card p-4 shadow-sm">
            <div className="row mb-3 ">
              <label htmlFor="inputAuzAdress" className="form-label fw-bold">
                Auszug Adresse
              </label>
              <input
                type="text"
                className="form-control"
                value={auftrag.auszugsadresse}
                name="auszugsadresse"
                onChange={handleChange}
              />
            </div>

            <div className="row mb-3 ">
              <label
                htmlFor="inputEtage1"
                className="form-label col-sm-2 col-form-label fw-bold d-flex justify-content-center"
              >
                Etage
              </label>
              <div className="col-sm-10">
                <select
                  className="form-select form-control"
                  value={auftrag.auszugsEtage}
                  name="auszugsEtage"
                  onChange={handleChange}
                >
                  <option defaultValue>EG</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>Haus</option>
                  <option>Hochparterre</option>
                </select>
              </div>
            </div>
            <div className="col-12">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={auftrag.auszugsAufzug === "mit Aufzug"}
                  name="auszugsAufzug"
                  onChange={handleChange}
                />
                <label
                  className="form-check-label fw-bold"
                  htmlFor="auszugsAufzug"
                >
                  Aufzug
                </label>
              </div>
            </div>
          </div>
          <div className="container mt-4 card p-4 shadow-sm">
            <div className="row mb-3 ">
              <label htmlFor="inputEinAdress" className="form-label fw-bold">
                Einzug Adresse
              </label>
              <input
                type="text"
                className="form-control"
                name="einzugsadresse"
                value={auftrag.einzugsadresse}
                onChange={handleChange}
              />
            </div>
            <div className="row mb-3">
              <label
                htmlFor="inputEtage2"
                className="form-label col-sm-2 col-form-label fw-bold d-flex justify-content-center"
              >
                Etage
              </label>
              <div className="col-sm-10">
                <select
                  className="form-select form-control"
                  value={auftrag.einzugsEtage}
                  name="einzugsEtage"
                  onChange={handleChange}
                >
                  <option defaultValue>EG</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>Haus</option>
                  <option>Hochparterre</option>
                </select>
              </div>
            </div>
            <div className="col-12">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={auftrag.einzugsAufzug === "mit Aufzug"}
                  name="einzugsAufzug"
                  value={auftrag.einzugsAufzug}
                  onChange={handleChange}
                />
                <label
                  className="form-check-label fw-bold"
                  htmlFor="einzugsAufzug"
                >
                  Aufzug
                </label>
              </div>
            </div>
          </div>
          <div className="container mt-4">
            <div className="row mb-3">
              <label
                htmlFor="inputPreis"
                className="col-sm-2 col-form-label fw-bold"
              >
                Preis
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  value={auftrag.preis}
                  name="preis"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row mb-3">
              <label
                htmlFor="inputHvz"
                className="col-sm-2 col-form-label fw-bold"
              >
                HVZ
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  value={auftrag.hvz}
                  name="hvz"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="row mb-3">
            <label htmlFor="inputPament" className="form-label fw-bold">
              Payment Method
            </label>

            <select
              className="form-select form-control"
              value={auftrag.bezahlMethod}
              name="bezahlMethod"
              onChange={handleChange}
            >
              <option value="Bezahlung in bar">Bezahlung in bar</option>
              <option value="Überweisung">Überweisung</option>
              <option value="Sofort Überweisung">Sofort Überweisung</option>
            </select>
          </div>

          <div className="row mb-3">
            <label htmlFor="Bemerkungen" className="form-label fw-bold">
              Bemerkungen
            </label>
            <textarea
              type="text"
              name="bemerkungen"
              rows="10"
              cols="30"
              className="form-control"
              value={auftrag.bemerkungen}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-success">
            Update Auftrag
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate(`/auftrag/${id}`)}
            style={{ marginLeft: 10 }}
          >
            Cancel
          </button>
        </form>
      </div>
    </>
  );
}

export default UpdateAuftrag;

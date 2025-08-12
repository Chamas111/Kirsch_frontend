import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../axiosinstance";

function UpdateHvz() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hvz, setHvz] = useState({
    datum: "",
    classification: "",
    straße: "",
    kundeName: "",
    status: "",
  });

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_BASE_URL}/api/hvzs/${id}`, {
        withCredentials: true,
      })
      .then((res) => setHvz(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleChange = (e) => {
    setHvz({ ...hvz, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${process.env.REACT_APP_SERVER_BASE_URL}/api/hvzs/${id}`,
        hvz,
        { withCredentials: true }
      );
      alert("HVZ updated successfully!");
      navigate("/hvz");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="d-flex justify-content-center mx-auto p-2 ">
      <form onSubmit={handleSubmit}>
        <h2 className="mx-auto p-2">HVZ bearbeiten</h2>

        <div className="row mb-3 p-2">
          <label
            htmlFor="inputdatum"
            className="col-sm-4 col-form-label fw-bold"
          >
            Datum
          </label>
          <div className="col-sm-10 col-md-6">
            <input
              name="datum"
              type="text"
              className="form-control"
              placeholder="dd.mm.yyyy"
              value={hvz.datum}
              onChange={handleChange}
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
              name="classification"
              className="form-select w-100"
              value={hvz.classification}
              onChange={handleChange}
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
              name="straße"
              type="text"
              className="form-control"
              value={hvz.straße}
              onChange={handleChange}
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
              name="kundeName"
              type="text"
              className="form-control"
              value={hvz.kundeName}
              onChange={handleChange}
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
              name="status"
              className="form-select form-control"
              value={hvz.status}
              onChange={handleChange}
            >
              <option value="Nicht bestellt">Nicht bestellt</option>
              <option value="Bestellt">Bestellt</option>
              <option value="Genehmigt">Genehmigt</option>
              <option value="Abgelehnt">Abgelehnt</option>
            </select>
          </div>
        </div>

        <button type="submit" className="btn btn-success">
          Save
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
  );
}

export default UpdateHvz;

import { useState, useEffect } from "react";
import axios from "../../axiosinstance";
import { useNavigate } from "react-router-dom";

function LagerRechnungen() {
  const navigate = useNavigate();
  const [lagerInvoices, setLagerInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLagerInvoices = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_SERVER_BASE_URL}/api/invoices/lager`,
          { withCredentials: true }
        );
        setLagerInvoices(res.data);
      } catch (err) {
        console.error("Error fetching Lager invoices", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLagerInvoices();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Möchten Sie diese Rechnung wirklich löschen?")) return;

    try {
      await axios.delete(
        `${process.env.REACT_APP_SERVER_BASE_URL}/api/invoices/${id}`,
        { withCredentials: true }
      );
      setLagerInvoices(lagerInvoices.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Fehler beim Löschen der Rechnung:", err);
      alert("Löschen fehlgeschlagen.");
    }
  };

  if (loading) return <p>Laden...</p>;

  return (
    <div>
      <h2 className="mx-auto p-2">Lager-Rechnungen</h2>

      <table className="table table-striped">
        <thead className="table-dark text-center">
          <tr>
            <th>#</th>
            <th>Rechnungsnummer</th>
            <th>Status</th>
            <th>Kunde</th>
            <th>Netto €</th>
            <th>MwSt €</th>
            <th>Brutto €</th>

            <th>Datum</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {lagerInvoices.length > 0 ? (
            lagerInvoices.map((item, index) => {
              const date = new Date(item.rechnungsDatum);
              const formattedDate = `${String(date.getDate()).padStart(
                2,
                "0"
              )}.${String(date.getMonth() + 1).padStart(
                2,
                "0"
              )}.${date.getFullYear()}`;

              return (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item.rechnungsNummer}</td>
                  <td
                    style={{
                      backgroundColor:
                        item.status?.trim() === "Überweisung"
                          ? "red"
                          : ["Bezahlt", "Cash", "Storniert"].includes(
                              item.status?.trim()
                            )
                          ? "green"
                          : "transparent",
                      color: "white",
                    }}
                  >
                    {item.status}
                  </td>
                  <td>{item.kundeName}</td>
                  <td>{item.nettoBetrag} €</td>
                  <td>{item.mwst} €</td>
                  <td>{item.brutto} €</td>
                  <td>{formattedDate}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="11" className="text-center">
                Keine Lager-Rechnungen gefunden.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default LagerRechnungen;

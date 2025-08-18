import { useState, useEffect } from "react";
import axios from "../axiosinstance";
import { useLocation, useNavigate } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return isNaN(d) ? "" : d.toLocaleDateString("de-DE");
};

function SearchResults() {
  const queryParams = useQuery();
  const navigate = useNavigate();
  const query = queryParams.get("query") || "";
  const [results, setResults] = useState({
    auftraege: [],
    invoices: [],
    ausgaben: [],
    hvzs: [],
    lagerungen: [],
  });

  useEffect(() => {
    if (!query) return;
    axios
      .get(`/api/search?query=${encodeURIComponent(query)}`)
      .then((res) => setResults(res.data))
      .catch((err) => console.error("❌ Fehler bei Suche:", err));
  }, [query]);

  useEffect(() => {
    return () => {
      // This runs when the component unmounts
      // You can call a prop function from your header to clear the input
      if (typeof window.clearSearchInput === "function") {
        window.clearSearchInput();
      }
    };
  }, []);

  const formatDate = (dateStr) => {
    if (!dateStr) return "";

    // Try ISO first
    let d = new Date(dateStr);
    if (!isNaN(d)) {
      return d.toLocaleDateString("de-DE");
    }

    // Handle format like DD.MM.YYYY
    const parts = dateStr.split(".");
    if (parts.length === 3) {
      const [day, month, year] = parts;
      d = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
      if (!isNaN(d)) {
        return d.toLocaleDateString("de-DE");
      }
    }

    return dateStr; // fallback: just return original string
  };

  // Handle X button in external search input
  useEffect(() => {
    const handleClear = () => {
      navigate(-1); // Go back when pressing X
    };

    if (typeof window.onSearchClear === "function") {
      window.onSearchClear(handleClear);
    }
  }, [navigate]);

  const renderTable = (data, columns) => {
    if (data.length === 0) return <p>No results found</p>;
    console.log("Lagerungen:", results.lagerungen);
    return (
      <table className="table table-striped">
        <thead className="table-dark text-center">
          <tr>
            {columns.map((col) => (
              <th key={col.key}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody className="text-center">
          {data.map((item, idx) => (
            <tr key={item._id}>
              {columns.map((col) => (
                <td key={col.key}>
                  {col.format
                    ? col.format(item, idx) // pass the whole item
                    : item[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="search-results">
      <h2>Search Results for "{query}"</h2>

      {results.auftraege?.length > 0 && (
        <section>
          <h3>Aufträge</h3>
          {renderTable(
            results.auftraege,
            [
              { key: "idx", label: "#" },
              { key: "title", label: "Title" },
              {
                key: "datum",
                label: "Datum",
                format: (item) => formatDate(item.start),
              },
              {
                key: "uhrZeit",
                label: "UhrZeit",
                format: (item) => {
                  if (!item.start) return "";
                  const date = new Date(item.start);
                  return date.toLocaleTimeString("de-DE", {
                    hour: "2-digit",
                    minute: "2-digit",
                  });
                },
              },
              { key: "kundeName", label: "Kunde" },
              { key: "tel", label: "Telefon" },
            ].map((col, i) =>
              col.key === "idx" ? { ...col, format: (_, idx) => idx + 1 } : col
            )
          )}
        </section>
      )}

      {results.invoices?.length > 0 && (
        <section>
          <h3>Invoices</h3>
          {renderTable(
            results.invoices,
            [
              { key: "idx", label: "#" },
              { key: "rechnungsNummer", label: "Rechnungsnummer" },
              { key: "status", label: "Status" },
              { key: "kundeName", label: "Kunde" },
              { key: "nettoBetrag", label: "Netto €" },
              { key: "mwst", label: "MwSt €" },
              { key: "brutto", label: "Brutto €" },
              {
                key: "rechnungsDatum",
                label: "Datum",
                format: (item) => formatDate(item.rechnungsDatum),
              },
            ].map((col, i) =>
              col.key === "idx" ? { ...col, format: (_, idx) => idx + 1 } : col
            )
          )}
        </section>
      )}

      {results.ausgaben?.length > 0 && (
        <section>
          <h3>Ausgaben</h3>
          {renderTable(
            results.ausgaben,
            [
              { key: "idx", label: "#" },
              { key: "datum", label: "Datum", format: formatDate },
              { key: "rechnungsNummer", label: "RechnungsNummer" },
              { key: "anbieter", label: "Anbieter" },
              { key: "betrag", label: "Betrag" },
            ].map((col, i) =>
              col.key === "idx" ? { ...col, format: (_, idx) => idx + 1 } : col
            )
          )}
        </section>
      )}

      {results.hvzs?.length > 0 && (
        <section>
          <h3>HVZ</h3>
          {renderTable(
            results.hvzs,
            [
              { key: "idx", label: "#" },
              {
                key: "datum",
                label: "Datum",
                format: (item) => formatDate(item.datum),
              },
              { key: "classification", label: "Classification" },
              { key: "straße", label: "Adresse" },
              { key: "kundeName", label: "Kunde" },
              { key: "status", label: "Status" },
            ].map((col, i) =>
              col.key === "idx" ? { ...col, format: (_, idx) => idx + 1 } : col
            )
          )}
        </section>
      )}

      {results.lagerungen?.length > 0 && (
        <section>
          <h3>Lagerungen</h3>
          {renderTable(
            results.lagerungen,
            [
              { key: "idx", label: "#" },
              {
                key: "datum",
                label: "Datum",
                format: (item) => formatDate(item.datum),
              },
              { key: "kundeName", label: "Kunde" },
              { key: "lager", label: "Lager Place" },
              { key: "employeeName", label: "Mitarbeiter" },
              { key: "notitz", label: "Notitz" },
            ].map((col, i) =>
              col.key === "idx" ? { ...col, format: (_, idx) => idx + 1 } : col
            )
          )}
        </section>
      )}
    </div>
  );
}
export default SearchResults;

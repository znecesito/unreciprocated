import React, { useCallback, useEffect, useState } from "react";
import ExportPicker from "../components/ExportPicker.jsx";
import ResultsList from "../components/ResultsList.jsx";
import ResultsSummary from "../components/ResultsSummary.jsx";
import { useExportData } from "../context/ExportDataContext.jsx";
import { PAGE_TITLE } from "../lib/classes.js";
import { loadConnectionsAnalysis } from "../utils/loadConnectionsAnalysis.js";

export default function CheckPage() {
  const { files, clearFiles } = useExportData();
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const runAnalysis = useCallback(async (exportFiles) => {
    setLoading(true);
    setError("");
    setAnalysis(null);
    try {
      const result = await loadConnectionsAnalysis(exportFiles);
      setAnalysis(result);
    } catch (err) {
      setError(err?.message || "Could not analyze this export.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!files) {
      setAnalysis(null);
      setError("");
      return;
    }
    runAnalysis(files);
  }, [files, runAnalysis]);

  function handleClear() {
    setAnalysis(null);
    setError("");
    clearFiles();
  }

  return (
    <div className="check-page">
      <div className="container">
        <header className="check-page__header">
          <h1 className={PAGE_TITLE}>Check your export</h1>
          <p className="check-page__lede muted">
            Upload your Instagram export. We read <code>followers_and_following</code> locally and
            list accounts you follow that don&apos;t follow you back.
          </p>
        </header>

        <div className="card export-picker-card">
          <h2 className="export-picker-card__title">Your export</h2>
          <ExportPicker />
        </div>

        {loading ? (
          <p className="check-page__status muted" role="status">
            Comparing followers and following…
          </p>
        ) : null}

        {error ? <div className="error check-page__error">{error}</div> : null}

        {analysis ? (
          <div className="check-page__results">
            <div className="check-page__results-header">
              <h2 className="check-page__results-title">Results</h2>
              <p className="check-page__disclaimer muted">
                Based on your export snapshot — not live Instagram data.
              </p>
            </div>
            <ResultsSummary stats={analysis.stats} />
            <ResultsList rows={analysis.rows} />
            <div className="check-page__actions">
              <button type="button" className="check-page__clear-btn" onClick={handleClear}>
                Clear export
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

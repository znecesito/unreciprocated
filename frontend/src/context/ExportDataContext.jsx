import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import { normalizeExportInput } from "../utils/exportIngest.js";

const ExportDataContext = createContext(null);

export function ExportDataProvider({ children }) {
  const [files, setFilesRaw] = useState(null);
  const [exportSource, setExportSource] = useState(null);
  const [ingestLoading, setIngestLoading] = useState(false);
  const [ingestProgress, setIngestProgress] = useState("");
  const [ingestError, setIngestError] = useState("");
  const [ingestWarning, setIngestWarning] = useState("");

  const loadExport = useCallback(async (fileList) => {
    const arr = Array.from(fileList || []);
    if (arr.length === 0) {
      return;
    }

    setIngestLoading(true);
    setIngestError("");
    setIngestWarning("");
    setIngestProgress("Checking export…");

    try {
      const { files: normalized, source, warning } = await normalizeExportInput(arr, {
        onProgress: setIngestProgress
      });

      setFilesRaw(normalized);
      setExportSource(source);
      setIngestWarning(warning || "");
      setIngestProgress("");
    } catch (err) {
      setIngestError(err?.message || "Could not read this export.");
      setIngestProgress("");
    } finally {
      setIngestLoading(false);
    }
  }, []);

  const clearFiles = useCallback(() => {
    setFilesRaw(null);
    setExportSource(null);
    setIngestError("");
    setIngestWarning("");
    setIngestProgress("");
  }, []);

  const value = useMemo(
    () => ({
      files,
      exportSource,
      loadExport,
      clearFiles,
      ingestLoading,
      ingestProgress,
      ingestError,
      ingestWarning
    }),
    [files, exportSource, loadExport, clearFiles, ingestLoading, ingestProgress, ingestError, ingestWarning]
  );

  return <ExportDataContext.Provider value={value}>{children}</ExportDataContext.Provider>;
}

export function useExportData() {
  const ctx = useContext(ExportDataContext);
  if (!ctx) {
    throw new Error("useExportData must be used within an ExportDataProvider");
  }
  return ctx;
}

import React, { useCallback, useEffect, useState } from "react";
import { ExportDataProvider, useExportData } from "./context/ExportDataContext.jsx";
import CheckPage from "./pages/CheckPage.jsx";
import LandingPage from "./pages/LandingPage.jsx";

const HOW_TO_HASH = "#how-to";

function resolveRoute(pathname) {
  if (pathname === "/check") {
    return "/check";
  }
  return "/";
}

function readLocation() {
  return {
    route: resolveRoute(window.location.pathname),
    hash: window.location.hash
  };
}

function AppInner() {
  const { files, clearFiles } = useExportData();
  const [location, setLocation] = useState(readLocation);
  const { route, hash: locationHash } = location;

  useEffect(() => {
    const syncRoute = () => setLocation(readLocation());
    window.addEventListener("popstate", syncRoute);
    return () => window.removeEventListener("popstate", syncRoute);
  }, []);

  const navigateTo = useCallback((path) => {
    if (path.startsWith("#")) {
      const sectionId = path.slice(1);
      window.history.pushState({}, "", path);
      setLocation({ route: "/", hash: path });
      requestAnimationFrame(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
      return;
    }

    if (path === "/how-to") {
      navigateTo(HOW_TO_HASH);
      return;
    }

    const target = resolveRoute(path);
    window.history.pushState({}, "", target);
    setLocation({ route: target, hash: "" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const onLanding = route === "/";

  return (
    <main className="app-shell">
      <header className="top-nav">
        <div className="top-nav__inner">
          <a
            href="/"
            className="top-nav__title top-nav__brand font-bold text-nav-link-text"
            onClick={(event) => {
              event.preventDefault();
              navigateTo("/");
            }}
          >
            unreciprocated
          </a>
          <nav className="top-nav__links" aria-label="Primary">
            {onLanding ? (
              <>
                <button type="button" className="nav-link" onClick={() => navigateTo("#preview")}>
                  What you get
                </button>
                <button
                  type="button"
                  className={locationHash === HOW_TO_HASH ? "nav-link is-active" : "nav-link"}
                  onClick={() => navigateTo(HOW_TO_HASH)}
                >
                  How to export
                </button>
                <button type="button" className="nav-link nav-link-cta" onClick={() => navigateTo("/check")}>
                  Check export
                </button>
              </>
            ) : (
              <>
                <button type="button" className="nav-link" onClick={() => navigateTo("/")}>
                  Home
                </button>
                <button
                  type="button"
                  className={route === "/check" ? "nav-link is-active" : "nav-link"}
                  onClick={() => navigateTo("/check")}
                >
                  Check
                </button>
                <button type="button" className="nav-link" onClick={() => navigateTo(HOW_TO_HASH)}>
                  How to export
                </button>
              </>
            )}
            {files ? (
              <>
                <span className="nav-data-indicator">
                  <span className="nav-data-indicator__dot" aria-hidden />
                  Data loaded
                </span>
                <button type="button" className="nav-clear-btn" onClick={clearFiles}>
                  Clear
                </button>
              </>
            ) : null}
          </nav>
        </div>
      </header>

      {route === "/" ? <LandingPage onNavigate={navigateTo} /> : <CheckPage />}
    </main>
  );
}

export default function App() {
  return (
    <ExportDataProvider>
      <AppInner />
    </ExportDataProvider>
  );
}

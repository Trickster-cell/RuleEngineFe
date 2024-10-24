import React, { Suspense, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Import styles and components
import "./App.css";
import { RuleProvider } from "../context/rules";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../components/Loading";

// Lazy load pages
const MainPage = React.lazy(() => import("../pages/MainPage"));
const CreateRule = React.lazy(() => import("../pages/CreateRule"));
const AvailableRules = React.lazy(() => import("../pages/AvailableRules"));
const VisualizeRule = React.lazy(() => import("../pages/VisualizeRule"));
const EvaluateMainPage = React.lazy(() => import("../pages/EvaluateMainPage"));
const EvaluateData = React.lazy(() => import("../pages/EvaluateData"));
const CombineRulesMainPage = React.lazy(() => import("../pages/CombineRulesMainPage"));

// Function to enable dark mode
const enableDarkMode = () => {
  document.documentElement.classList.add("dark");
};

function App() {
  useEffect(() => {
    enableDarkMode();
  }, []);

  return (
    <RuleProvider>
      <div className="App">
        <ToastContainer autoClose={2000} />

        <BrowserRouter>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/createRule" element={<CreateRule />} />
              <Route path="/availableRules" element={<AvailableRules />} />
              <Route path="/visualize/:id" element={<VisualizeRule />} />
              <Route path="/evaluate" element={<EvaluateMainPage />} />
              <Route path="/evaluate/:id" element={<EvaluateData />} />
              <Route path="/combine" element={<CombineRulesMainPage />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </div>
    </RuleProvider>
  );
}

export default App;

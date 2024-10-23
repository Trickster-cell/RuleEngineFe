import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Import styles and components
import "./App.css";
import MainPage from "../pages/MainPage";
import CreateRule from "../pages/CreateRule";
import AvailableRules from "../pages/AvailableRules";
import VisualizeRule from "../pages/VisualizeRule";
import EvaluateMainPage from "../pages/EvaluateMainPage";
import EvaluateData from "../pages/EvaluateData";
import { RuleProvider } from "../context/rules";
import CombineRulesMainPage from "../pages/CombineRulesMainPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/createRule" element={<CreateRule />} />
            <Route path="/availableRules" element={<AvailableRules />} />
            <Route path="/visualize/:id" element={<VisualizeRule />} />
            <Route path="/evaluate" element={<EvaluateMainPage />} />
            <Route path="/evaluate/:id" element={<EvaluateData />} />
            <Route path="/combine" element={<CombineRulesMainPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </RuleProvider>
  );
}

export default App;

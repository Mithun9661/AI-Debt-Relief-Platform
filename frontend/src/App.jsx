import { BrowserRouter, Route, Routes } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Negotiation from "./pages/NegotiationEmail";
import Rights from "./pages/KnowYourRights";
import Settlement from "./pages/SettlementPredictor";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/settlement" element={<Settlement />} />
          <Route path="/negotiation" element={<Negotiation />} />
          <Route path="/rights" element={<Rights />} />
          <Route path="/history" element={<History />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

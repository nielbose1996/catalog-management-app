import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DetailsPage from "./pages/DetailsPage";

function App() {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) || []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage cart={cart} setCart={setCart} />} />
        <Route path="/product/:id" element={<DetailsPage />} />
      </Routes>
    </Router>
  );
}

export default App;

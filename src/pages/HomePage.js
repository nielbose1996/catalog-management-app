import React from "react";
import DataGridTable from "../components/DataGridTable";
import Cart from "../components/Cart";
import { Box } from "@mui/material";

const HomePage = ({ cart, setCart }) => (
  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
    <DataGridTable cart={cart} setCart={setCart} />
    <Cart cart={cart} setCart={setCart} />
  </Box>
);

export default HomePage;

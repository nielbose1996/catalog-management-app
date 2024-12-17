import React from "react";
import { Box, Typography, Button, List, ListItem, ListItemText } from "@mui/material";

const Cart = ({ cart, setCart }) => {
  const handlePlaceOrder = () => {
    alert("Order Placed!");
    setCart([]);
    localStorage.removeItem("cart");
  };

  return (
    <Box
      sx={{
        width: 300,
        position: "fixed",
        top: 0,
        right: 0,
        height: "100vh",
        backgroundColor: "#f4f4f4",
        borderLeft: "2px solid #ddd",
        padding: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxShadow: "-2px 0 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography variant="h5" sx={{ mb: 2 }}>
        Cart
      </Typography>
      <List
        sx={{
          flexGrow: 1,
          overflowY: "auto", 
          maxHeight: "calc(100vh - 120px)", 
        }}
      >
        {cart.length === 0 ? (
          <Typography>No items in cart</Typography>
        ) : (
          cart.map((item, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={item.name}
                secondary={`${item.mrp} INR`}
              />
            </ListItem>
          ))
        )}
      </List>
      <Button
        variant="contained"
        color="primary"
        onClick={handlePlaceOrder}
        sx={{
          width: "100%",
          backgroundColor: "#28a745",
           marginBottom: "25px",
          "&:hover": { backgroundColor: "#218838" },
        }}
      >
        Place Order
      </Button>
    </Box>
  );
};

export default Cart;

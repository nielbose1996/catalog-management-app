import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { fetchProducts } from "../utils/api"; 
import { Box, Typography, CircularProgress } from "@mui/material";

const ProductDetails = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const page = searchParams.get("page"); 

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      setError("");
      try {
        
        const response = await fetchProducts(page);
        const { products } = response;

        
        const foundProduct = products.find((p) => p.sku_code === id);

        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          setError("Product not found on this page.");
        }
      } catch (error) {
        console.error("Failed to load product:", error);
        setError("Error fetching product details.");
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id, page]);

  return (
    <Box sx={{ p: 4 }}>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : product ? (
        <>
          <Typography variant="h4" sx={{ mb: 2 }}>
            {product.name}
          </Typography>
          <img
            src={product.images?.front || "https://via.placeholder.com/200"}
            alt={product.name}
            style={{ width: "300px", height: "300px", objectFit: "contain" }}
          />
          <Typography sx={{ mt: 2 }}>Price: {product.mrp?.mrp} INR</Typography>
          <Typography>Category: {product.main_category}</Typography>
          <Typography>SKU Code: {product.sku_code}</Typography>
        </>
      ) : (
        <Typography>Product not found.</Typography>
      )}
    </Box>
  );
};

export default ProductDetails;

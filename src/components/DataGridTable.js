import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { fetchProducts } from "../utils/api";
import { Box, TextField, CircularProgress, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const DataGridTable = ({ cart, setCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(Number(localStorage.getItem("gridPage")) || 1); 
  const [searchQuery, setSearchQuery] = useState("");
  const [paginationModel, setPaginationModel] = useState({
    page: currentPage - 1, 
    pageSize: 20,
  });

  const navigate = useNavigate();

  useEffect(() => {
    setCurrentPage(paginationModel.page + 1);
    localStorage.setItem("gridPage", paginationModel.page + 1); 
  }, [paginationModel]);

  const loadProducts = async (page) => {
    setLoading(true);
    setError("");
    try {
      const response = await fetchProducts(page);
      const { products: fetchedProducts, totalPages: apiTotalPages } = response;

      const formattedProducts = fetchedProducts.map((product) => ({
        sku_code: product.sku_code,
        name: product.name,
        main_category: product.main_category,
        mrp: product.mrp.mrp,
        image: product.images?.front || "https://via.placeholder.com/50",
      }));

      setProducts(formattedProducts);
      setTotalPages(Number(apiTotalPages));
    } catch (err) {
      console.error("Failed to fetch products:", err);
      setError("Unable to load products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts(currentPage);
  }, [currentPage]);

  const handleRowClick = (params) => {
    navigate(`/product/${params.row.sku_code}?page=${currentPage}`);
  };

  const handleAddToCart = (product, event) => {
    event.stopPropagation();
    const newCart = [...cart, product];
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = [
    {
      field: "image",
      headerName: "",
      width: 100,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <img
          src={params.row.image}
          alt="Product"
          style={{ width: 50, height: 50, objectFit: "cover" }}
        />
      ),
    },
    { field: "name", headerName: "Product Name", width: 200, sortable: false, filterable: false },
    {
      field: "main_category",
      headerName: "Category",
      width: 150,
      sortable: false,
    },
    {
      field: "mrp",
      headerName: "Price (INR)",
      width: 120,
      sortable: true,
      filterable: false,
    },
    {
      field: "addToCart",
      headerName: "",
      width: 142,
      sortable: false,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={(event) => handleAddToCart(params.row, event)} 
        >
          Add to Cart
        </Button>
      ),
    },
  ];

  return (
    <Box sx={{ height: 600, width: 1200 }}>
      <Box sx={{ mb: 2, display: "flex", gap: 2 }}>
        <TextField
          label="Search Product"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Box>

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <CircularProgress />
        </Box>
      ) : (
        <DataGrid
          rows={filteredProducts}
          columns={columns}
          pagination
          pageSize={20}
          pageSizeOptions={[20]}
          rowCount={totalPages * 20}
          paginationModel={paginationModel}
          paginationMode="server"
          onPaginationModelChange={setPaginationModel}
          getRowId={(row) => row.sku_code}
          disableSelectionOnClick
          onRowClick={handleRowClick}
        />
      )}
    </Box>
  );
};

export default DataGridTable;

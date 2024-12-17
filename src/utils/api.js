import axios from "axios";

const BASE_URL =
  "https://catalog-management-system-dev-ak3ogf6zea-uc.a.run.app/cms/products";

export const fetchProducts = async (page) => {
  const queryParams = new URLSearchParams({
    page
  });
  try {
    const response = await axios.get(`${BASE_URL}?${queryParams.toString()}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

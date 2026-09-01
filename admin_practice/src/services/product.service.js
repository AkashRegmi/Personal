import axios from "axios";
const API_URL = import.meta.env.VITE_PRODUCT;

export const addProduct = async (productData) => {
  const formData = new FormData();

  // 1. Append standard text fields
  formData.append("name", productData.name);
  formData.append("description", productData.description);
  formData.append("price", productData.price);

  // 2. Fix: Handle the tags array cleanly
  // Standard backend configurations expect arrays to be sent per-item
  formData.append("tags", JSON.stringify(productData.tags));

  // 3. Fix: Extract the raw File object from the FileList container
  if (productData.image && productData.image.length > 0) {
    formData.append("image", productData.image[0]); // Grabs the actual binary file
  }
  const response = await axios.post(`${API_URL}`, formData);

  return response.data;
};

//get all the products
export const getAllProducts = async () => {
  const response = await axios.get(`${API_URL}`);

  return response.data;
};
//delete the Product
export const deleteProduct = async (productId) => {
  const response = await axios.delete(`${API_URL}/${productId}`);
  return response.data;
};

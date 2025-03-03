// admin.service.js
import { useState } from "react";
import API_BASE_URL from "./apiConfig";
import axios from "axios";

function AdminService() {
  const [isLoading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(false);

  const authHeader = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.token) {
      return { Authorization: `${user.type.trim()} ${user.token}` };
    }
    return {};
  };

  // 📦 Categorías
  const getAllCategories = async () => {
    setLoading(true);
    await axios
      .get(`${API_BASE_URL}/category-service/category/get/all`, {
        headers: authHeader(),
      })
      .then((response) => {
        setCategories(response.data.response);
        setError(false);
      })
      .catch(() => {
        setCategories([]);
        setError(true);
      });
    setLoading(false);
  };

  const createCategory = async (data) => {
    setLoading(true);
    await axios
      .post(`${API_BASE_URL}/category-service/admin/category/create`, data, {
        headers: authHeader(),
      })
      .catch(() => {
        setError(true);
      });
    setLoading(false);
  };

  const editCategory = async (categoryId, data) => {
    setLoading(true);
    await axios
      .put(
        `${API_BASE_URL}/category-service/admin/category/edit?categoryId=${categoryId}`,
        data,
        { headers: authHeader() }
      )
      .catch(() => {
        setError(true);
      });
    setLoading(false);
  };

  const deleteCategory = async (categoryId) => {
    setLoading(true);
    await axios
      .delete(
        `${API_BASE_URL}/category-service/admin/category/delete?categoryId=${categoryId}`,
        { headers: authHeader() }
      )
      .catch(() => {
        setError(true);
      });
    setLoading(false);
  };

  // 🛒 Productos
  const getAllProducts = async () => {
    setLoading(true);
    await axios
      .get(`${API_BASE_URL}/product-service/product/get/all`, {
        headers: authHeader(),
      })
      .then((response) => {
        setProducts(response.data.response);
        setError(false);
      })
      .catch(() => {
        setProducts([]);
        setError(true);
      });
    setLoading(false);
  };

  const addProduct = async (data) => {
    setLoading(true);
    await axios
      .post(`${API_BASE_URL}/product-service/admin/product/add`, data, {
        headers: authHeader(),
      })
      .catch(() => {
        setError(true);
      });
    setLoading(false);
  };

  const editProduct = async (productId, data) => {
    setLoading(true);
    await axios
      .put(
        `${API_BASE_URL}/product-service/admin/product/edit?productId=${productId}`,
        data,
        { headers: authHeader() }
      )
      .catch(() => {
        setError(true);
      });
    setLoading(false);
  };

  // 🧾 Órdenes
  const getAllOrders = async () => {
    setLoading(true);
    await axios
      .get(`${API_BASE_URL}/order-service/order/get/all`, {
        headers: authHeader(),
      })
      .then((response) => {
        setOrders(response.data.response);
        setError(false);
      })
      .catch(() => {
        setOrders([]);
        setError(true);
      });
    setLoading(false);
  };

  // Método para cancelar una orden
  const cancelOrder = async (orderId) => {
    setLoading(true);
    setError(false);
    try {
      const token = JSON.parse(localStorage.getItem("user"))?.token;
      console.log("Cancelando orden con token:", token);

      await axios.patch(
        `${API_BASE_URL}/order-service/order/cancel?orderId=${orderId}`,
        {}, // No se envía cuerpo, solo query param
        { headers: authHeader() }
      );
      console.log("Orden cancelada con éxito");
    } catch (err) {
      console.error("Error al cancelar la orden:", err);
      setError(true);
      throw err; // Re-lanzamos el error para que el componente lo maneje
    } finally {
      setLoading(false);
    }
  };

  return {
    getAllCategories,
    createCategory,
    editCategory,
    deleteCategory,
    getAllProducts,
    addProduct,
    editProduct,
    getAllOrders,
    cancelOrder, // Añadimos cancelOrder al retorno
    isLoading,
    categories,
    products,
    orders,
    error,
  };
}

export default AdminService;
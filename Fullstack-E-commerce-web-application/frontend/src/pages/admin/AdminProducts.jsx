import React, { useEffect, useState } from "react";
import AdminService from "../../api-service/admin.service";
import "./AdminProducts.css";

function AdminProducts() {
  const {
    getAllProducts,
    addProduct,
    editProduct,
    getAllCategories, // Añadimos este método del servicio
    products,
    categories, // Añadimos el estado de categorías desde el servicio
    isLoading,
    error,
  } = AdminService();

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({
    id: "",
    productName: "",
    price: "",
    description: "",
    imageUrl: "",
    categoryId: "",
    categoryName: "", // Lo mantenemos para mostrar el nombre en la UI si es necesario
  });

  useEffect(() => {
    getAllProducts();
    getAllCategories(); // Cargamos las categorías al montar el componente
  }, []);

  const handleOpenForm = (product = null) => {
    setIsFormVisible(true);
    if (product) {
      setIsEditMode(true);
      setCurrentProduct(product);
    } else {
      setIsEditMode(false);
      setCurrentProduct({
        id: "",
        productName: "",
        price: "",
        description: "",
        imageUrl: "",
        categoryId: "",
        categoryName: "",
      });
    }
  };

  const handleCloseForm = () => {
    setIsFormVisible(false);
    setIsEditMode(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduct((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "categoryId" && { // Actualizamos categoryName cuando cambie la categoría
        categoryName: categories.find((cat) => cat.id === value)?.categoryName || "",
      }),
    }));
  };

  const handleSubmit = async () => {
    try {
      if (!currentProduct.productName || !currentProduct.price || !currentProduct.categoryId) {
        alert("Nombre, precio y categoría son obligatorios.");
        return;
      }
      const productData = {
        productName: currentProduct.productName,
        price: currentProduct.price,
        description: currentProduct.description,
        imageUrl: currentProduct.imageUrl,
        categoryId: currentProduct.categoryId,
      };
      if (isEditMode) {
        await editProduct(currentProduct.id, productData);
      } else {
        await addProduct(productData);
      }
      await getAllProducts();
      handleCloseForm();
    } catch (err) {
      console.error("Error al guardar el producto:", err);
      alert("Ocurrió un error al guardar el producto.");
    }
  };

  return (
    <div className="admin-products-container">
      <h1>Gestión de Productos</h1>
      {isLoading && <p className="loading-message">Cargando...</p>}
      {error && <p className="error-message">Error al obtener los productos</p>}

      <button className="create-btn" onClick={() => handleOpenForm()}>
        Agregar Producto
      </button>

      <ul className="products-list">
        {products.map((prod) => (
          <li className="product-card" key={prod.id}>
            <h3>{prod.productName}</h3>
            <p>Precio: ${prod.price}</p>
            <p>{prod.description}</p>
            <p>Categoría: {prod.categoryName}</p>
            <div className="product-actions">
              <button className="edit-btn" onClick={() => handleOpenForm(prod)}>
                Editar
              </button>
            </div>
          </li>
        ))}
      </ul>

      {isFormVisible && (
        <div className="modal">
          <div className="modal-content">
            <h2>{isEditMode ? "Editar Producto" : "Agregar Producto"}</h2>
            <input
              type="text"
              name="productName"
              placeholder="Nombre del producto"
              value={currentProduct.productName}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="price"
              placeholder="Precio"
              value={currentProduct.price}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="description"
              placeholder="Descripción"
              value={currentProduct.description}
              onChange={handleChange}
            />
            <input
              type="text"
              name="imageUrl"
              placeholder="URL de la imagen"
              value={currentProduct.imageUrl}
              onChange={handleChange}
            />
            <select
              name="categoryId"
              value={currentProduct.categoryId}
              onChange={handleChange}
              required
            >
              <option value="">Selecciona una categoría</option>
              {categories && categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.categoryName}
                </option>
              ))}
            </select>
            <div className="modal-actions">
              <button className="save-btn" onClick={handleSubmit}>
                {isEditMode ? "Guardar Cambios" : "Agregar"}
              </button>
              <button className="cancel-btn" onClick={handleCloseForm}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminProducts;
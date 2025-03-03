import React, { useEffect, useState } from "react";
import AdminService from "../../api-service/admin.service";
import "./AdminCategories.css";

function AdminCategories() {
  const {
    getAllCategories,
    createCategory,
    editCategory,
    deleteCategory,
    categories,
    isLoading,
    error,
  } = AdminService();

  const [formData, setFormData] = useState({
    categoryName: "",
    description: "",
    imageUrl: "",
  });

  const [editingCategory, setEditingCategory] = useState(null);

  useEffect(() => {
    getAllCategories();
  }, []);

  const handleInputChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.categoryName.trim() || !formData.description.trim()) {
      alert("El nombre y la descripción son obligatorios.");
      return;
    }

    console.log("formData antes de enviar:", formData);

    const categoryData = {
      name: formData.categoryName.trim(), // Cambiamos a 'name' para coincidir con el backend
      description: formData.description.trim(),
      imageUrl: formData.imageUrl.trim(),
    };

    console.log("Datos enviados al backend:", categoryData);

    try {
      let response;
      if (editingCategory) {
        response = await editCategory(editingCategory.id, categoryData);
        console.log("Respuesta del servidor al editar:", response);
        setEditingCategory(null);
      } else {
        response = await createCategory(categoryData);
        console.log("Respuesta del servidor al crear:", response);
      }

      await getAllCategories();
      setFormData({ categoryName: "", description: "", imageUrl: "" });
    } catch (error) {
      console.error("Error al guardar la categoría:", error);
      alert(`Error al guardar: ${error.message}`);
    }
  };

  const handleEditClick = (category) => {
    console.log("Categoría seleccionada para editar:", category);
    setFormData({
      categoryName: category.categoryName || "",
      description: category.description || "",
      imageUrl: category.imageUrl || "",
    });
    setEditingCategory(category);
  };

  const handleDeleteCategory = async (id) => {
    try {
      await deleteCategory(id);
      await getAllCategories();
    } catch (error) {
      console.error("Error al eliminar la categoría:", error);
    }
  };

  return (
    <div className="admin-categories-container">
      <h1>Gestión de Categorías</h1>
      {isLoading && <p className="loading-message">Cargando...</p>}
      {error && (
        <p className="error-message">Error al obtener las categorías</p>
      )}

      <form className="category-form" onSubmit={handleSubmit}>
        {editingCategory && (
          <h2 className="editing-title">
            Editando: {editingCategory.categoryName}
          </h2>
        )}
        <input
          type="text"
          name="categoryName"
          placeholder="Nombre de la categoría"
          value={formData.categoryName}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Descripción"
          value={formData.description}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="imageUrl"
          placeholder="URL de la imagen"
          value={formData.imageUrl}
          onChange={handleInputChange}
        />
        <button type="submit" className="create-category-btn">
          {editingCategory ? "Actualizar Categoría" : "Crear Categoría"}
        </button>
      </form>

      <div className="categories-list">
        {categories.map((cat) => (
          <div className="category-card" key={cat.id}>
            <h3>{cat.categoryName}</h3>
            <p>{cat.description}</p>
            <div className="action-buttons">
              <button className="edit-btn" onClick={() => handleEditClick(cat)}>
                Editar
              </button>
              <button
                className="delete-btn"
                onClick={() => handleDeleteCategory(cat.id)}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminCategories;
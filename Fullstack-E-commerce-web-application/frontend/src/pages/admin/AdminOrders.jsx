import React, { useEffect, useState } from "react";
import AdminService from "../../api-service/admin.service";
import "./AdminOrders.css";

function AdminOrders() {
  const { getAllOrders, cancelOrder, orders, isLoading, error } = AdminService();
  const [expandedOrder, setExpandedOrder] = useState(null);

  // Cargar órdenes solo al montar el componente
  useEffect(() => {
    getAllOrders();
  }, []); // Sin dependencias para evitar bucles

  const handleToggleDetails = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const handleCancelOrder = async (orderId) => {
    if (window.confirm("¿Estás seguro de que quieres cancelar esta orden?")) {
      try {
        const token = localStorage.getItem("token");
        console.log("Cancelando orden:", orderId, "con token:", token);
        await cancelOrder(orderId);
        console.log("Orden cancelada con éxito");
        await getAllOrders(); // Refrescar después de cancelar
      } catch (err) {
        console.error("Error al cancelar la orden:", err);
        alert("No se pudo cancelar la orden: " + err.message);
      }
    }
  };

  return (
    <div className="admin-orders-container">
      <h1>Gestión de Órdenes</h1>
      {isLoading && <p className="loading-message">Cargando...</p>}
      {error && <p className="error-message">{error}</p>}

      <ul className="orders-list">
        {orders.length > 0 ? (
          orders.map((order) => (
            <li className="order-card" key={order.id}>
              <div className="order-summary">
                <h3>Pedido #{order.id}</h3>
                <p>Cliente: {order.firstName} {order.lastName}</p>
                <p>Estado: {order.orderStatus}</p>
                <p>Pago: {order.paymentStatus}</p>
                <p>Total: ${order.orderAmt}</p>
                <button
                  className="details-btn"
                  onClick={() => handleToggleDetails(order.id)}
                >
                  {expandedOrder === order.id ? "Ocultar Detalles" : "Ver Detalles"}
                </button>
              </div>

              {expandedOrder === order.id && (
                <div className="order-details">
                  <h4>Detalles de la Orden</h4>
                  <p><strong>Usuario ID:</strong> {order.userId}</p>
                  <p><strong>Dirección:</strong> {order.addressLine1} {order.addressLine2}, {order.city}</p>
                  <p><strong>Teléfono:</strong> {order.phoneNo}</p>
                  <p><strong>Fecha:</strong> {new Date(order.placedOn).toLocaleString()}</p>
                  <h5>Items:</h5>
                  <ul className="order-items">
                    {order.orderItems.map((item, index) => (
                      <li key={index}>
                        <p><strong>{item.productName}</strong></p>
                        <p>Precio: ${item.price} | Cantidad: {item.quantity} | Total: ${item.amount}</p>
                        <p>Categoría: {item.categoryName}</p>
                        <img src={item.imageUrl} alt={item.productName} className="item-image" />
                      </li>
                    ))}
                  </ul>
                  <div className="action-buttons">
                    {order.orderStatus !== "CANCELLED" && (
                      <button
                        className="cancel-btn"
                        onClick={() => handleCancelOrder(order.id)}
                      >
                        Cancelar Orden
                      </button>
                    )}
                  </div>
                </div>
              )}
            </li>
          ))
        ) : (
          <p>No hay órdenes disponibles.</p>
        )}
      </ul>
    </div>
  );
}

export default AdminOrders;
import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Logo from "../../components/logo/logo";
import "./checkout.css";
import CopyRight from "../../components/footer/copyright";
import OrderService from "../../api-service/order.service";
import CartContext from "../../contexts/cart.contect"; 

// Función para sanitizar entradas
const sanitizeInput = (input) => {
  if (!input) return "";
  // Permitir solo caracteres alfanuméricos, espacios y algunos caracteres básicos
  return input.replace(/[^a-zA-Z0-9\s\-_.,]/g, "").trim();
};

const CheckoutForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({ mode: "onChange" });
  const { isLoading, error, placeOrder } = OrderService();
  const { cart, cartError, isProcessingCart, getCartInformation } = useContext(CartContext);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!cart?.cartItems?.length && !isProcessingCart) {
      navigate("/"); // Redirigir si el carrito está vacío
    }
  }, [cart, isProcessingCart, navigate]);

  const onSubmit = async (data) => {
    try {
      setSubmitError(null);
      // Sanitizar los datos antes de enviarlos
      const sanitizedData = {
        fname: sanitizeInput(data.fname),
        lname: sanitizeInput(data.lname),
        address1: sanitizeInput(data.address1),
        address2: sanitizeInput(data.address2 || ""),
        city: sanitizeInput(data.city),
        phone: sanitizeInput(data.phone),
      };

      await placeOrder(sanitizedData, cart.cartId);
      setOrderPlaced(true);
      setTimeout(() => navigate("/order/success"), 2000);
    } catch (err) {
      console.error("Error al procesar la orden:", err);
      setSubmitError("No se pudo procesar el pedido. Intenta de nuevo más tarde.");
    }
  };

  if (!cart?.cartItems) {
    return (
      <div className="loading-overlay">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <>
      <header className="app-header">
        <Link to="/" className="logo-link">
          <Logo />
        </Link>
      </header>
      <div className="checkout-container">
        <h1>Finalizar Compra</h1>
        <div className="checkout-wrapper">
          <form onSubmit={handleSubmit(onSubmit)}>
            {error && <div className="text-danger">{error}</div>}
            {submitError && <div className="text-danger">{submitError}</div>}
            {orderPlaced && (
              <div className="form-success">
                ¡Pedido procesado correctamente! Serás redirigido en breve...
              </div>
            )}

            <div className="input-box">
              <label htmlFor="fname">Nombre</label>
              <input
                type="text"
                className="form-control"
                placeholder="Ej. Juan"
                {...register("fname", {
                  required: "¡El nombre es obligatorio!",
                  pattern: {
                    value: /^[a-zA-Z\s]+$/,
                    message: "Solo se permiten letras y espacios",
                  },
                  maxLength: {
                    value: 50,
                    message: "Máximo 50 caracteres",
                  },
                })}
              />
              {errors.fname && (
                <small className="text-danger">{errors.fname.message}</small>
              )}
            </div>

            <div className="input-box">
              <label htmlFor="lname">Apellido</label>
              <input
                type="text"
                className="form-control"
                placeholder="Ej. Pérez"
                {...register("lname", {
                  required: "¡El apellido es obligatorio!",
                  pattern: {
                    value: /^[a-zA-Z\s]+$/,
                    message: "Solo se permiten letras y espacios",
                  },
                  maxLength: {
                    value: 50,
                    message: "Máximo 50 caracteres",
                  },
                })}
              />
              {errors.lname && (
                <small className="text-danger">{errors.lname.message}</small>
              )}
            </div>

            <div className="input-box">
              <label htmlFor="address1">Dirección Línea 1</label>
              <input
                type="text"
                className="form-control"
                placeholder="Ej. Calle No, Zona"
                {...register("address1", {
                  required: "¡La dirección es obligatoria!",
                  pattern: {
                    value: /^[a-zA-Z0-9\s\-_.,]+$/,
                    message: "Caracteres no permitidos",
                  },
                  maxLength: {
                    value: 100,
                    message: "Máximo 100 caracteres",
                  },
                })}
              />
              {errors.address1 && (
                <small className="text-danger">{errors.address1.message}</small>
              )}
            </div>

            <div className="input-box">
              <label htmlFor="address2">Dirección Línea 2</label>
              <input
                type="text"
                className="form-control"
                placeholder="Ej. Piso o número de departamento"
                {...register("address2", {
                  pattern: {
                    value: /^[a-zA-Z0-9\s\-_.,]*$/,
                    message: "Caracteres no permitidos",
                  },
                  maxLength: {
                    value: 100,
                    message: "Máximo 100 caracteres",
                  },
                })}
              />
              {errors.address2 && (
                <small className="text-danger">{errors.address2.message}</small>
              )}
            </div>

            <div className="input-box">
              <label htmlFor="city">Ciudad</label>
              <input
                type="text"
                className="form-control"
                placeholder="Ej. Buenos Aires"
                {...register("city", {
                  required: "¡La ciudad es obligatoria!",
                  pattern: {
                    value: /^[a-zA-Z\s]+$/,
                    message: "Solo se permiten letras y espacios",
                  },
                  maxLength: {
                    value: 50,
                    message: "Máximo 50 caracteres",
                  },
                })}
              />
              {errors.city && (
                <small className="text-danger">{errors.city.message}</small>
              )}
            </div>

            <div className="input-box">
              <label htmlFor="phone">Teléfono</label>
              <input
                type="text"
                className="form-control"
                placeholder="Ej. 07xxxxxxxx"
                {...register("phone", {
                  required: "¡El teléfono es obligatorio!",
                  pattern: {
                    value: /^[0-9]{9,10}$/,
                    message: "Debe ser un número de 9 a 10 dígitos",
                  },
                })}
              />
              {errors.phone && (
                <small className="text-danger">{errors.phone.message}</small>
              )}
            </div>

            <button
              type="submit"
              className={isLoading ? "loading" : ""}
              name="proceed"
              disabled={isLoading || orderPlaced}
            >
              {isLoading ? "Procesando..." : orderPlaced ? "¡Pedido Realizado!" : "Realizar Pedido"}
            </button>
          </form>

          <summary>
            <h2>Resumen del pedido</h2>
            <hr />
            {cart?.cartItems.map((cartItem) => (
              <div className="product" key={cartItem.productId}>
                <img src={`${cartItem.imageUrl}`} alt={sanitizeInput(cartItem.productName)} />
                <div className="product-info">
                  <h4>{sanitizeInput(cartItem.productName)}</h4>
                  <span className="product-price">
                    ${cartItem.price} x {cartItem.quantity} = ${parseFloat(cartItem.amount).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
            <hr />
            <h3>
              <span>Subtotal</span>
              <span>${parseFloat(cart?.subtotal).toFixed(2)}</span>
            </h3>
            <br />
            <small>
              Los gastos de envío se agregarán al total final y serán cobrados
              en la entrega por nuestro personal.
            </small>
            <br />
            <Link to="/">
              <button>Editar carrito</button>
            </Link>
          </summary>
        </div>
      </div>
      <CopyRight />
    </>
  );
};

export default CheckoutForm;
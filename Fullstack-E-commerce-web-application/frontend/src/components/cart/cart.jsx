
import React, { useContext, useEffect, useState } from "react"; // Añade React aquí
import "./cart.css";
import CartContext from "../../contexts/cart.contect";
import { AiOutlineClose, AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiShoppingCart } from "react-icons/fi"; // Añadido para mensajes vacíos
import Loading from "../loading/loading";
import Info from "../info/info";
import { AuthContext } from "../../contexts/auth.context";
import { useNavigate } from "react-router-dom";

function Cart({ isCartOpen, onClose }) {
  const { cart, isProcessingCart, addItemToCart, removeItemFromCart } =
    useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [newItem, setNewItem] = useState(null);

  useEffect(() => {
    // getCartInformation()
  }, [user]);

  const onProductRemove = (id) => {
    removeItemFromCart(id);
  };

  const onQuantityChange = (id, qty) => {
    addItemToCart(id, qty);
    if (qty > 0) {
      setNewItem(id);
      setTimeout(() => setNewItem(null), 500);
    }
  };

  const onCheckout = () => {
    navigate(`/order/checkout`);
  };

  return (
    <>
      <div className={isCartOpen ? "shoppingCart active" : "shoppingCart"}>
        <div className="header">
          <h2>Tu carrito</h2>
          <div className="btn close-btn" onClick={onClose}>
            <AiOutlineClose size={20} />
          </div>
        </div>
        {isProcessingCart && <Loading />}
        {!isProcessingCart && (!cart.cartItems || cart.cartItems.length === 0) && (
          <div className="info-message">
            <FiShoppingCart size={50} />
            <p>¡Tu carrito está vacío!</p>
            <p>Añade algunos productos orgánicos para empezar.</p>
          </div>
        )}
        {!isProcessingCart && (
          <>
            <div className="cart-products">
              {cart.cartItems &&
                cart?.cartItems.map((cartItem) => (
                  <div 
                    className={`cart-product ${newItem === cartItem.productId ? 'item-added' : ''}`} 
                    key={cartItem.productId}
                  >
                    <img
                      src={`${cartItem.imageUrl}`}
                      alt={cartItem.productName}
                    />
                    <div className="product-info">
                      <h4>
                        {cartItem.productName}
                        <div
                          className={
                            cartItem.quantity === 20
                              ? "btn close-btn disable"
                              : "btn close-btn"
                          }
                          onClick={() => onProductRemove(cartItem.productId)}
                        >
                          <RiDeleteBin6Line size={16} />
                        </div>
                      </h4>
                      <span className="product-price">
                        ${cartItem.price} x {cartItem.quantity} = $
                        {parseFloat(cartItem.amount).toFixed(2)}
                      </span>
                      <div className="quantity-control">
                        <span
                          className={cartItem.quantity === 1 ? "disable" : ""}
                          onClick={() =>
                            onQuantityChange(cartItem.productId, -1)
                          }
                        >
                          <AiOutlineMinus size={16} />
                        </span>
                        <span className="count">{cartItem.quantity}</span>
                        <span
                          className={cartItem.quantity === 20 ? "disable" : ""}
                          onClick={() =>
                            onQuantityChange(cartItem.productId, 1)
                          }
                        >
                          <AiOutlinePlus size={16} />
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            {cart.cartItems && cart.cartItems.length > 0 && (
              <div className="cart-summary">
                <h3>Subtotal: $ {parseFloat(cart.subtotal).toFixed(2)}</h3>
                <button className="checkout-btn" onClick={onCheckout}>
                  Proceder al pago
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default Cart;
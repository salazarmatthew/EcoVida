// src/components/cart/Cart.test.js
import React from "react"; // Agrega esta línea
import { render, screen, fireEvent } from "@testing-library/react";
import Cart from "./cart";
import CartContext from "../../contexts/cart.contect";
import { AuthContext } from "../../contexts/auth.context";
import { useNavigate } from "react-router-dom";

jest.mock("react-icons/ai", () => ({
  AiOutlineClose: () => <span>Close</span>,
  AiOutlinePlus: () => <span>Plus</span>,
  AiOutlineMinus: () => <span>Minus</span>,
}));
jest.mock("react-icons/ri", () => ({
  RiDeleteBin6Line: () => <span>Delete</span>,
}));
jest.mock("react-icons/fi", () => ({
  FiShoppingCart: () => <span>CartIcon</span>,
}));

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Cart Component", () => {
  const mockCartContext = {
    cart: { cartItems: [], subtotal: 0 },
    isProcessingCart: false,
    addItemToCart: jest.fn(),
    removeItemFromCart: jest.fn(),
  };
  const mockAuthContext = { user: null };

  const renderCart = (cartContext = mockCartContext, authContext = mockAuthContext) => {
    return render(
      <AuthContext.Provider value={authContext}>
        <CartContext.Provider value={cartContext}>
          <Cart isCartOpen={true} onClose={jest.fn()} />
        </CartContext.Provider>
      </AuthContext.Provider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders empty cart message when cartItems is empty", () => {
    renderCart();
    expect(screen.getByText("¡Tu carrito está vacío!")).toBeInTheDocument();
    expect(screen.getByText("Añade algunos productos orgánicos para empezar.")).toBeInTheDocument();
  });

  test("shows loading when isProcessingCart is true", () => {
    renderCart({ ...mockCartContext, isProcessingCart: true });
    expect(screen.getByTestId("loader")).toBeInTheDocument(); // Cambia "loading" a "loader"
  });

  test("renders cart items when cartItems exist", () => {
    const cartWithItems = {
      ...mockCartContext,
      cart: {
        cartItems: [
          {
            productId: 1,
            productName: "Producto 1",
            price: 10,
            quantity: 2,
            amount: 20,
            imageUrl: "http://example.com/img1.jpg",
          },
        ],
        subtotal: 20,
      },
    };
    renderCart(cartWithItems);
    expect(screen.getByText("Producto 1")).toBeInTheDocument();
    expect(screen.getByText("$10 x 2 = $20.00")).toBeInTheDocument();
  });

  test("calls removeItemFromCart when delete button is clicked", () => {
    const cartWithItems = {
      ...mockCartContext,
      cart: {
        cartItems: [
          {
            productId: 1,
            productName: "Producto 1",
            price: 10,
            quantity: 2,
            amount: 20,
            imageUrl: "http://example.com/img1.jpg",
          },
        ],
        subtotal: 20,
      },
    };
    const mockRemoveItem = jest.fn();
    renderCart({ ...cartWithItems, removeItemFromCart: mockRemoveItem });

    fireEvent.click(screen.getByText("Delete"));
    expect(mockRemoveItem).toHaveBeenCalledWith(1);
  });

  test("calls addItemToCart when quantity is increased", () => {
    const cartWithItems = {
      ...mockCartContext,
      cart: {
        cartItems: [
          {
            productId: 1,
            productName: "Producto 1",
            price: 10,
            quantity: 2,
            amount: 20,
            imageUrl: "http://example.com/img1.jpg",
          },
        ],
        subtotal: 20,
      },
    };
    const mockAddItem = jest.fn();
    renderCart({ ...cartWithItems, addItemToCart: mockAddItem });

    fireEvent.click(screen.getByText("Plus"));
    expect(mockAddItem).toHaveBeenCalledWith(1, 1);
  });

  test("calls addItemToCart when quantity is decreased", () => {
    const cartWithItems = {
      ...mockCartContext,
      cart: {
        cartItems: [
          {
            productId: 1,
            productName: "Producto 1",
            price: 10,
            quantity: 2,
            amount: 20,
            imageUrl: "http://example.com/img1.jpg",
          },
        ],
        subtotal: 20,
      },
    };
    const mockAddItem = jest.fn();
    renderCart({ ...cartWithItems, addItemToCart: mockAddItem });

    fireEvent.click(screen.getByText("Minus"));
    expect(mockAddItem).toHaveBeenCalledWith(1, -1);
  });

  test("navigates to checkout when checkout button is clicked", () => {
    const cartWithItems = {
      ...mockCartContext,
      cart: {
        cartItems: [
          {
            productId: 1,
            productName: "Producto 1",
            price: 10,
            quantity: 2,
            amount: 20,
            imageUrl: "http://example.com/img1.jpg",
          },
        ],
        subtotal: 20,
      },
    };
    renderCart(cartWithItems);

    fireEvent.click(screen.getByText("Proceder al pago"));
    expect(mockNavigate).toHaveBeenCalledWith("/order/checkout");
  });

  test("calls onClose when close button is clicked", () => {
    const mockOnClose = jest.fn();
    render(
      <AuthContext.Provider value={mockAuthContext}>
        <CartContext.Provider value={mockCartContext}>
          <Cart isCartOpen={true} onClose={mockOnClose} />
        </CartContext.Provider>
      </AuthContext.Provider>
    );
    fireEvent.click(screen.getByText("Close"));
    expect(mockOnClose).toHaveBeenCalled();
  });
});
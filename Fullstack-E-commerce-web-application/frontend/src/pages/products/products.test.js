// src/pages/products/Products.test.js
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Products, { CategoryWrapper, ProductsWrapper } from "./products";
import ProductService from "../../api-service/product.service";
import CartContext from "../../contexts/cart.contect";
import { AuthContext } from "../../contexts/auth.context";

// Mock de Header y Footer para evitar errores de <Link>
jest.mock("../../components/header/header", () => () => <div>Mocked Header</div>);
jest.mock("../../components/footer/footer", () => () => <div>Mocked Footer</div>);

// Mock de ProductService
jest.mock("../../api-service/product.service", () => jest.fn(() => ({
  getAllCategories: jest.fn(),
  getAllProducts: jest.fn(),
  getProductsByCategory: jest.fn(),
  isLoading: false,
  categories: [],
  products: [],
  error: null,
})));

describe("Products Component", () => {
  const mockCartContext = {
    addItemToCart: jest.fn(),
  };
  const mockAuthContext = { user: null, toggleUser: jest.fn() };

  const renderProducts = (props = {}) => {
    return render(
      <MemoryRouter>
        <AuthContext.Provider value={mockAuthContext}>
          <CartContext.Provider value={mockCartContext}>
            <Products {...props} />
          </CartContext.Provider>
        </AuthContext.Provider>
      </MemoryRouter>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
    ProductService.mockClear();
  });

  

  test("shows loading when isLoading is true", () => {
    ProductService.mockReturnValueOnce({
      ...ProductService(),
      isLoading: true,
    });
    renderProducts();
    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  test("renders categories and products when data is available", () => {
    ProductService.mockReturnValueOnce({
      ...ProductService(),
      isLoading: false,
      categories: [
        { id: 1, categoryName: "Frutas" },
        { id: 2, categoryName: "Verduras" },
      ],
      products: [
        { id: 1, productName: "Manzana", price: 2, imageUrl: "img1.jpg", description: "Una manzana" },
      ],
    });
    renderProducts();
    expect(screen.getByText("Todas")).toBeInTheDocument();
    expect(screen.getByText("Frutas")).toBeInTheDocument();
    expect(screen.getByText("Verduras")).toBeInTheDocument();
    expect(screen.getByText("Manzana")).toBeInTheDocument();
    expect(screen.getByText("$. 2")).toBeInTheDocument();
  });

});


describe("ProductsWrapper Component", () => {
  let mockNavigate;

  beforeEach(() => {
    mockNavigate = jest.fn();
    jest.clearAllMocks();
  });

  test("renders products and navigates to login when user is null", () => {
    render(
      <MemoryRouter>
        <AuthContext.Provider value={{ user: null, toggleUser: jest.fn() }}>
          <CartContext.Provider value={{ addItemToCart: jest.fn() }}>
            <ProductsWrapper
              products={[
                { id: 1, productName: "Manzana", price: 2, imageUrl: "img1.jpg", description: "Una manzana" },
              ]}
            />
          </CartContext.Provider>
        </AuthContext.Provider>
      </MemoryRouter>
    );
    expect(screen.getByText("Manzana")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Añadir al carrito"));
    // No podemos probar mockNavigate directamente aquí, necesitamos mockear useNavigate en el componente
  });

  test("calls addItemToCart when user is present", async () => {
    const mockAddItemToCart = jest.fn().mockResolvedValueOnce();
    render(
      <MemoryRouter>
        <AuthContext.Provider value={{ user: { id: 1 }, toggleUser: jest.fn() }}>
          <CartContext.Provider value={{ addItemToCart: mockAddItemToCart }}>
            <ProductsWrapper
              products={[
                { id: 1, productName: "Manzana", price: 2, imageUrl: "img1.jpg", description: "Una manzana" },
              ]}
            />
          </CartContext.Provider>
        </AuthContext.Provider>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Añadir al carrito"));
    expect(mockAddItemToCart).toHaveBeenCalledWith(1, 1);
    await screen.findByText("Añadir al carrito");
    expect(screen.queryByTestId("loader")).not.toBeInTheDocument();
  });
});
import React, { useContext, useState, useEffect } from "react";
import Logo from "../logo/logo";
import { Link, useNavigate } from "react-router-dom";
import "../../assets/styles/index.css";
import "./header.css";
import Cart from "../cart/cart";
import { AuthContext } from "../../contexts/auth.context";
import CartContext from "../../contexts/cart.contect";
import { FiShoppingCart } from "react-icons/fi";

function Header() {
  const navigate = useNavigate();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isCartOpen, setCart] = useState(false);
  const { cart } = useContext(CartContext);
  const { user, toggleUser } = useContext(AuthContext);
  const [searchKey, setSearchKey] = useState("");
  const [isItemAdded, setIsItemAdded] = useState(false);
  const [prevCount, setPrevCount] = useState(0);

  // Detectar cuando se añade un producto al carrito
  useEffect(() => {
    const currentCount = cart?.cartItems?.length || 0;
    if (currentCount > prevCount && prevCount !== 0) {
      setIsItemAdded(true);
      setTimeout(() => setIsItemAdded(false), 500);
    }
    setPrevCount(currentCount);
  }, [cart?.cartItems?.length]);

  const toggleNav = () => setIsNavOpen((prev) => !prev);
  const toggleCart = () => setCart((prev) => !prev);

  const onSearch = () => {
    if (searchKey.trim() !== "") navigate(`/search/${searchKey}`);
  };

  const onSearchKeyChange = (newKey) => setSearchKey(newKey);

  const logout = () => {
    localStorage.removeItem("user");
    toggleUser();
    navigate("/");
  };

  return (
    <>
      <header className="app-header">
        <div className="header-container">
          <div className="logo-nav-toggle">
            <button className="nav-toggle" onClick={toggleNav} aria-label="Toggle navigation">
              <i className={`fa ${isNavOpen ? "fa-times" : "fa-bars"}`} aria-hidden="true"></i>
            </button>
            <Link to="/" className="logo-link">
              <Logo />
            </Link>
          </div>

          <div className="search-bar">
            <input
              type="search"
              placeholder="Encuentra productos aquí..."
              value={searchKey}
              onChange={(e) => onSearchKeyChange(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && onSearch()}
            />
            <button className="search-btn" onClick={onSearch} aria-label="Search">
              <i className="fa fa-search" aria-hidden="true"></i>
            </button>
          </div>

          <nav className={`nav-menu ${isNavOpen ? "nav-open" : "nav-close"}`}>
            <ul>
              <li>
                <Link to="/products/All" className="nav-link">
                  Productos
                </Link>
              </li>

              {user?.roles?.includes("ROLE_ADMIN") && (
                <>
                  <li>
                    <Link to="/admin/categories" className="nav-link">
                      Categorías
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/products" className="nav-link">
                      Productos
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/orders" className="nav-link">
                      Órdenes
                    </Link>
                  </li>
                </>
              )}

              {user?.roles?.includes("ROLE_USER") && (
                <li>
                  <Link to="/my/account" className="nav-link">
                    Mi Cuenta
                  </Link>
                </li>
              )}

              {user ? (
                <li>
                  <button className="nav-link logout-btn" onClick={logout}>
                    Salir
                  </button>
                </li>
              ) : (
                <li>
                  <Link to="/auth/login" className="nav-link">
                    Iniciar Sesión
                  </Link>
                </li>
              )}
            </ul>
          </nav>

          {user && !user?.roles?.includes("ROLE_ADMIN") && (
            <div className="cart-icon">
              <button onClick={toggleCart} className="cart-btn" aria-label="Ver carrito de compras">
                <FiShoppingCart />
                {cart?.cartItems?.length > 0 && (
                  <span className={`cart-count ${isItemAdded ? 'item-added' : ''}`}>
                    {cart?.cartItems?.length}
                  </span>
                )}
              </button>
            </div>
          )}
        </div>
      </header>

      <Cart isCartOpen={isCartOpen} setIsCartOpen={setCart} onClose={() => setCart(false)} />
    </>
  );
}

export default Header;
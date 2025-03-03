import "./search.css";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/header/header";
import { useContext, useEffect, useState } from "react";
import Loading from "../../components/loading/loading";
import Info from "../../components/info/info";
import ProductService from "../../api-service/product.service";
import CartContext from "../../contexts/cart.contect";
import { AuthContext } from "../../contexts/auth.context";
import Footer from "../../components/footer/footer";

// Función para sanitizar el parámetro de búsqueda
const sanitizeInput = (input) => {
  if (!input) return "";
  // Permitir solo letras, números, espacios y algunos caracteres básicos
  const sanitized = input.replace(/[^a-zA-Z0-9\s\-_]/g, "");
  return sanitized.trim();
};

function Search() {
  const { search } = useParams();
  const { searchProducts, isLoading, products, error } = ProductService();
  const sanitizedSearch = sanitizeInput(search); // Sanitizamos el input

  useEffect(() => {
    if (sanitizedSearch) {
      searchProducts(sanitizedSearch); // Usamos el valor sanitizado
    }
  }, [sanitizedSearch]);

  return (
    <>
      <Header />
      {isLoading && <Loading />}
      {error && (
        <Info message="No se pueden buscar productos en este momento. Inténtalo más tarde..." />
      )}
      {!isLoading && !error && (
        <>
          <h3 className="search-result">
            {products.length} producto/s encontrado/s para <q>{sanitizedSearch}</q>
          </h3>
          <ProductsWrapper products={products} />
        </>
      )}
      <Footer />
    </>
  );
}

export default Search;

function ProductsWrapper({ products }) {
  const { addItemToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onAddToCart = async (productId) => {
    if (!user) {
      navigate("/auth/login");
      return;
    }
    setLoading(true);
    await addItemToCart(productId, 1);
    setLoading(false);
  };

  return (
    <section className="products-container">
      <div className="products-wrapper">
        {isLoading ? (
          <Loading />
        ) : (
          products.map((product) => (
            <div className="box" key={product.id}>
              <img
                src={`${product.imageUrl}`}
                className="image"
                alt="producto"
              />
              <div className="price" aria-label="precio">
                Rs. {product.price}
              </div>
              <div className="text-part">
                <div className="name">{product.productName}</div>
                <div className="description">{product.description}</div>
              </div>
              <button onClick={() => onAddToCart(product.id)}>
                Añadir al carrito
              </button>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
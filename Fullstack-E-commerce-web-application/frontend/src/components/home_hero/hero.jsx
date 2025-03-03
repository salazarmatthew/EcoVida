import { useContext } from "react";
import { AuthContext } from "../../contexts/auth.context";
import "./hero.css";
import { Link } from "react-router-dom";

function Hero() {
  const { user } = useContext(AuthContext);

  return (
    <section className="hero-section" id="hero">
      <div className="hero-content">
        <h1>Cultivando un futuro más verde, un producto a la vez</h1>
        
        <h3>
          En EcoVida conectamos pequeños agricultores orgánicos con personas comprometidas 
          con su salud y el planeta. Cada compra apoya nuestra misión de agricultura sostenible 
          y bienestar comunitario.
        </h3>
        
        <div className="hero-buttons">
          <Link to="/products/All">
            <button className="primary-button">Explorar productos</button>
          </Link>
          
          <Link to="/about">
            <button className="secondary-button">Conoce nuestra misión</button>
          </Link>
        </div>
        
        <div className="hero-badges">
          <div className="badge">
            <i className="fa fa-leaf"></i>
            <span>100% Orgánico</span>
          </div>
          <div className="badge">
            <i className="fa fa-heart"></i>
            <span>Apoyo local</span>
          </div>
          <div className="badge">
            <i className="fa fa-globe"></i>
            <span>Eco-sostenible</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
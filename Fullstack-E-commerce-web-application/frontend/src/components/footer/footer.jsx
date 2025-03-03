import React from 'react';
import { Link } from 'react-router-dom';
import './footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="coffee-footer">
      <div className="footer-top">
        <div className="footer-waves">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="footer-wave-path"></path>
          </svg>
        </div>
      </div>

      <div className="footer-content">
        <div className="footer-section aboutt">
          <h3>Sobre Nosotros</h3>
          <p>Somos una tienda dedicada a ofrecer productos de la más alta calidad para nuestros clientes. Nuestra misión es proporcionar una experiencia de compra excepcional.</p>
          <div className="contact">
            <div><i className="fa fa-map-marker"></i> Av. Principal #123, Ciudad</div>
            <div><i className="fa fa-phone"></i> (123) 456-7890</div>
            <div><i className="fa fa-envelope"></i> info@ecovida.com</div>
          </div>
          <div className="socials">
            <a href="#" className="social-icon"><i className="fa fa-facebook"></i></a>
            <a href="#" className="social-icon"><i className="fa fa-instagram"></i></a>
            <a href="#" className="social-icon"><i className="fa fa-twitter"></i></a>
            <a href="#" className="social-icon"><i className="fa fa-pinterest"></i></a>
          </div>
        </div>

        <div className="footer-section links">
          <h3>Enlaces Rápidos</h3>
          <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/products/All">Productos</Link></li>
            <li><Link to="/about">Sobre Nosotros</Link></li>
            <li><Link to="/contact">Contacto</Link></li>
            <li><Link to="/faq">Preguntas Frecuentes</Link></li>
          </ul>
        </div>

        <div className="footer-section categories">
          <h3>Categorías</h3>
          <ul>
            <li><Link to="/products/Coffee">Productos</Link></li>
            <li><Link to="/products/Accessories">Accesorios</Link></li>
            <li><Link to="/products/Gifts">Regalos</Link></li>
            <li><Link to="/products/Equipment">Equipamiento</Link></li>
            <li><Link to="/products/Snacks">Snacks</Link></li>
          </ul>
        </div>

        <div className="footer-section newsletter">
          <h3>Boletín de Noticias</h3>
          <p>Suscríbete para recibir las últimas novedades y ofertas especiales.</p>
          <form>
            <input type="email" placeholder="Tu correo electrónico" required />
            <button type="submit" className="btn-subscribe">
              <i className="fa fa-paper-plane"></i>
            </button>
          </form>
          <div className="subscription-message">
            <p>Al suscribirte aceptas nuestra política de privacidad</p>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-logo">
          <h2>EcoVida</h2>
          <p>Una vida mas saludable y un mundo sostenible.</p>
        </div>
        <div className="copyright">
          &copy; {currentYear} EcoVida. Todos los derechos reservados.
        </div>
        <div className="footer-links-bottom">
          <Link to="/privacy">Privacidad</Link>
          <Link to="/terms">Términos</Link>
          <Link to="/sitemap">Mapa del Sitio</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
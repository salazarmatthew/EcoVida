import { Link } from "react-router-dom";
import Logo from "../../components/logo/logo";
import { AuthContext } from "../../contexts/auth.context";
import { useContext, useEffect } from "react";
import success from "../../assets/images/icons/success.gif";
import "./success.css";

function OrderSuccess() {
  const { user } = useContext(AuthContext);
  
  // Efecto de confeti cuando la página se carga
  useEffect(() => {
    const confettiEffect = setTimeout(() => {
      // Este timeout sincroniza la animación del confeti
      const confettiContainer = document.querySelector('.order-success-box');
      if (confettiContainer) {
        confettiContainer.classList.add('show-confetti');
      }
    }, 300);
    
    return () => clearTimeout(confettiEffect);
  }, []);

  return (
    <main className="order-success">
      <div className="order-success-box">
        <Logo />
        
        {/* Icono de verificación animado SVG */}
        <svg className="checkmark-circle" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
          <circle className="background" cx="26" cy="26" r="25" fill="none" stroke-width="2"/>
          <path className="checkmark" fill="none" stroke-width="3" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
        </svg>
        
        <img src={success} alt="Pedido exitoso" />
        
        <h4>
          ¡Gracias por tu pedido!
          <br />
          Tu orden ha sido realizada con éxito.
        </h4>
        
        <h4>
          Se ha enviado un correo de confirmación a <span className="email">{user?.email || 'tu correo'}</span>.
        </h4>
        
        <Link to="/">
          <button>Continuar comprando</button>
        </Link>
      </div>
    </main>
  );
}

export default OrderSuccess;
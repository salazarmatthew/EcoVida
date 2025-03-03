import { Link } from "react-router-dom";
import success from "../../../assets/images/icons/success.gif";
import Logo from "../../../components/logo/logo";
import { useEffect } from "react";
import "./succesful.css";

function RegistrationSuccessful() {
  useEffect(() => {
    // Crear confeti dinámico
    const container = document.querySelector('.order-success');
    for (let i = 0; i < 50; i++) {
      createConfetti(container);
    }
    
    // Crear confeti cada cierto tiempo
    const interval = setInterval(() => {
      createConfetti(container);
    }, 300);
    
    // Limpiar al desmontar
    return () => clearInterval(interval);
    
    function createConfetti(container) {
      const confetti = document.createElement('div');
      confetti.classList.add('dynamic-confetti');
      
      // Posición aleatoria en la parte superior
      confetti.style.left = Math.random() * 100 + '%';
      confetti.style.top = '-10px';
      
      // Tamaño aleatorio
      const size = Math.floor(Math.random() * 10) + 5;
      confetti.style.width = size + 'px';
      confetti.style.height = size + 'px';
      
      // Color aleatorio
      const colors = ['#4CAF50', '#81C784', '#FFD700', '#FFF1AA'];
      confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
      
      // Forma aleatoria
      const shapes = ['circle', 'square', 'diamond'];
      const shape = shapes[Math.floor(Math.random() * shapes.length)];
      if (shape === 'circle') {
        confetti.style.borderRadius = '50%';
      } else if (shape === 'diamond') {
        confetti.style.transform = 'rotate(45deg)';
      }
      
      // Animación
      confetti.style.animation = `confetti-fall ${Math.random() * 5 + 3}s linear forwards`;
      
      container.appendChild(confetti);
      
      // Eliminar después de la animación
      setTimeout(() => {
        confetti.remove();
      }, 8000);
    }
  }, []);

  return (
    <main className="order-success">
      <div className="order-success-box">
        <Logo />
        <img src={success} alt="Registro exitoso" />
        <h4>
          ¡Felicitaciones, su cuenta ha sido creada exitosamente!
        </h4>
        <Link to="/auth/login">
          <button>Iniciar sesión ahora</button>
        </Link>
      </div>
    </main>
  );
}

export default RegistrationSuccessful;
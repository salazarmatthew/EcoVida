import { Link } from "react-router-dom";
import Logo from "../../../components/logo/logo";

function NotFound() {
  return (
    <main className="auth-container">
      <div
        className="auth-wrapper"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "10px",
          gap: "20px",
          height: "100vh",
        }}
      >
        <Logo />
        <h1>404 - Página no encontrada</h1>
        <h3 style={{ textAlign: "center" }}>
          ¡Lo sentimos! La página que estás buscando no fue encontrada o no
          existe. Intenta actualizar la página o haz clic en el botón de abajo
          para volver a la página de inicio.
        </h3>

        <Link to="/">
          <button>Ir a inicio</button>
        </Link>
      </div>
    </main>
  );
}

export default NotFound;

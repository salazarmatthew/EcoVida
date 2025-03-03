import { Link } from "react-router-dom";
import Logo from "../../../components/logo/logo";

function Unauthorized() {
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
        <h1>401 - No autorizado</h1>
        <h3 style={{ textAlign: "center" }}>
          Lo sentimos, parece que intentaste acceder a una página para la que no
          tienes autorización. Intenta actualizar la página o haz clic en el
          botón de abajo para volver a la página de inicio.
        </h3>
        <Link to="/">
          <button>Ir a inicio</button>
        </Link>
      </div>
    </main>
  );
}

export default Unauthorized;

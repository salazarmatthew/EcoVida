import "./login.css";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../../components/logo/logo";
import AuthService from "../../../api-service/auth.service";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../../contexts/auth.context";

function Login() {
  const { register, handleSubmit, formState } = useForm();
  const { login, isLoading, error } = AuthService();
  const { user, toggleUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.token) {
      navigate("/");
    }
  }, [user]);

  const onSubmit = async (data) => {
    await login(data.email, data.password);
    toggleUser();
  };

  return (
    <main className="auth-container">
      <div className="auth-wrapper">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Logo />
          <h2>Inicio de sesión</h2>
          {error && <p>{error}</p>}

          <div className="input-box">
            <label>
              Correo electrónico
              <input
                type="text"
                placeholder="juan@gmail.com"
                {...register("email", {
                  required: "¡El correo electrónico es obligatorio!",
                  pattern: {
                    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                    message: "¡Dirección de correo inválida!",
                  },
                })}
              />
            </label>

            {formState.errors.email && (
              <small>{formState.errors.email.message}</small>
            )}
          </div>

          <div className="input-box">
            <label>
              Contraseña
              <input
                type="password"
                placeholder="********"
                {...register("password", {
                  required: "¡La contraseña es obligatoria!",
                })}
              />
            </label>
            {formState.errors.password && (
              <small>{formState.errors.password.message}</small>
            )}
          </div>

          <div className="input-box">
            <input
              type="submit"
              value={isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
              className={isLoading ? "loading" : ""}
            />
          </div>

          {/* Sección de registro mejorada */}
          <div className="register-section">
            <div className="separator">
              <span>¿No tienes una cuenta?</span>
            </div>
            <Link to="/auth/register" className="register-button">
              Crea una cuenta nueva
            </Link>
           
          </div>
        </form>
      </div>
    </main>
  );
}

export default Login;

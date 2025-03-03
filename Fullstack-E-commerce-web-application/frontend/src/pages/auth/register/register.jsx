import "../login/login.css";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import AuthService from "../../../api-service/auth.service";
import Logo from "../../../components/logo/logo";

function Register() {
  const { register, handleSubmit, formState, watch } = useForm();
  const password = useRef({});
  password.current = watch("password", "");
  const { save, isLoading, error } = AuthService();

  const onSubmit = (data) => {
    save(data.username, data.email, data.password);
  };

  return (
    <main className="auth-container">
      <div className="auth-wrapper">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Logo />
          <h2>¡Regístrate ahora!</h2>
          {error && <p>{error}</p>}

          <div className="input-box">
            <label>
              <input
                type="text"
                placeholder="Nombre de usuario"
                {...register("username", {
                  required: "¡El nombre de usuario es obligatorio!",
                  maxLength: {
                    value: 20,
                    message:
                      "¡El nombre de usuario no puede tener más de 20 caracteres!",
                  },
                  minLength: {
                    value: 3,
                    message:
                      "¡El nombre de usuario debe tener al menos 3 caracteres!",
                  },
                })}
              />
            </label>

            {formState.errors.username && (
              <small>{formState.errors.username.message}</small>
            )}
          </div>

          <div className="input-box">
            <label>
              <input
                type="text"
                placeholder="Correo electrónico"
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
              <input
                type="password"
                placeholder="Contraseña"
                {...register("password", {
                  required: "¡La contraseña es obligatoria!",
                  minLength: {
                    value: 8,
                    message: "¡La contraseña debe tener al menos 8 caracteres!",
                  },
                  maxLength: {
                    value: 20,
                    message:
                      "¡La contraseña no puede tener más de 20 caracteres!",
                  },
                })}
              />
            </label>

            {formState.errors.password && (
              <small>{formState.errors.password.message}</small>
            )}
          </div>

          <div className="input-box">
            <input
              type="password"
              placeholder="Confirmar contraseña"
              {...register("cpassword", {
                required: "¡La confirmación de contraseña es obligatoria!",
                minLength: {
                  value: 8,
                  message: "¡La contraseña debe tener al menos 8 caracteres!",
                },
                maxLength: {
                  value: 20,
                  message:
                    "¡La contraseña no puede tener más de 20 caracteres!",
                },
                validate: (cpass) =>
                  cpass === password.current ||
                  "¡Las contraseñas no coinciden!",
              })}
            />
            {formState.errors.cpassword && (
              <small>{formState.errors.cpassword.message}</small>
            )}
          </div>

          <div className="input-box">
            <input
              type="submit"
              value={isLoading ? "Registrando..." : "Registrarse"}
              className={isLoading ? "loading" : ""}
            />
          </div>
          <div className="msg">
            Al hacer clic en Registrarse, aceptas nuestro acuerdo de usuario y
            política de privacidad.
          </div>
          <div className="msg">
            ¿Ya tienes una cuenta?{" "}
            <Link to="/auth/login" className="auth-link">
              Inicia sesión aquí
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}

export default Register;

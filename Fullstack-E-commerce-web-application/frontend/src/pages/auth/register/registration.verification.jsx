import "../login/login.css";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import AuthService from "../../../api-service/auth.service";
import Logo from "../../../components/logo/logo";

function RegistrationVerification() {
  const { email } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, formState } = useForm();
  const { verifyRegistration, resendVerificationCode, isLoading, error } =
    AuthService();

  const onVerify = (data) => {
    verifyRegistration(data.code);
  };

  const onResend = () => {
    resendVerificationCode(email);
  };

  return (
    <main className="auth-container">
      <div className="auth-wrapper">
        <form onSubmit={handleSubmit(onVerify)} style={{ gap: "15px" }}>
          <Logo />
          <h2>Verifica tu correo electrónico</h2>

          {error && <p>{error}</p>}

          <div className="input-box">
            <label>
              <input
                placeholder="Ingresa el código de verificación"
                type="text"
                {...register("code", {
                  required: "¡El código de verificación es obligatorio!",
                })}
              />
            </label>
            {formState.errors.code && (
              <small>{formState.errors.code.message}</small>
            )}
          </div>

          <div className="msg" style={{ fontWeight: 600, fontStyle: "italic" }}>
            Ten en cuenta que el código de verificación expirará en 15 minutos.
          </div>

          <div className="input-box">
            <input
              type="submit"
              value={isLoading ? "Verificando..." : "Verificar"}
              className={isLoading ? "loading" : ""}
            />
          </div>

          <div className="msg">
            ¿Tienes problemas?{" "}
            <span className="auth-link" onClick={onResend}>
              Reenviar código
            </span>
          </div>
        </form>
      </div>
    </main>
  );
}

export default RegistrationVerification;

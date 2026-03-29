import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderAuth from "@components/Auth/HeaderAuth";
import Footer from "@components/Landing/Footer";
import { useTheme } from "@context/ThemeContext";
import { useAuth } from "@context/AuthContext";
import AuthForm from "@components/Auth/AuthForm";
import api from "@/config/api";
import apiRoutes from "@/config/apiRoutes";
import { useSwal } from "@/hooks/useSwal";

export default function Auth({ initialTab = "login" }) {
  const Swal = useSwal();
  const { theme } = useTheme();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (email, password) => {
    if (!email || !password) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Por favor, completa todos los campos",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await api.post(apiRoutes.login(), {
        email,
        password,
      });

      // Guardar token y datos de usuario si existen
      if (response.data && response.data.access_token) {
        localStorage.setItem("userToken", response.data.access_token);
        if (response.data.user) {
          localStorage.setItem("user", JSON.stringify(response.data.user));
        }

        // También actualizar el contexto
        login(response.data.access_token, response.data.user);

        Swal.fire({
          icon: "success",
          title: "¡Bienvenido!",
          text: "Has iniciado sesión correctamente.",
          timer: 2000,
          showConfirmButton: false,
        }).then(() => {
          navigate("/user");
        });
      } else {
        throw new Error("No se recibió un token válido");
      }
    } catch (error) {
      const errorMessage =
        (error.response?.data?.errors &&
          Object.values(error.response.data.errors).flat().join(" ")) ||
        error.response?.data?.message ||
        error.response?.data?.error ||
        "No se pudo iniciar sesión.";

      Swal.fire({
        icon: "error",
        title: "Error",
        text: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (name, email, password, acceptTerms) => {
    if (!name || !email || !password) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Por favor, completa todos los campos",
      });
      return;
    }

    if (password.length < 6) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "La contraseña debe tener al menos 6 caracteres",
      });
      return;
    }

    if (!acceptTerms) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Debes aceptar los términos y condiciones",
      });
      return;
    }

    setLoading(true);
    try {
      // Llamada al backend con el checkbox de términos
      await api.post(apiRoutes.register(), {
        username: name,
        email,
        password,
        accept_terms: acceptTerms,
      });

      Swal.fire({
        icon: "success",
        title: "Registro completado",
        text: "Revisa tu correo para activar tu cuenta antes de iniciar sesión.",
        timer: 3000,
        showConfirmButton: false,
      });
    } catch (error) {
      const errorMessage =
        (error.response?.data?.errors &&
          Object.values(error.response.data.errors).flat().join(" ")) ||
        error.response?.data?.message ||
        error.response?.data?.error ||
        "No se pudo registrar el usuario.";

      Swal.fire({
        icon: "error",
        title: "Error",
        text: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  const handleGoogleAuth = async (token, error) => {
    // Si hay un error, manejarlo
    if (error) {
      setLoading(false);
      let errorMessage = "No se pudo autenticar con Google.";

      if (error.includes("origin") || error.includes("client_id")) {
        errorMessage =
          "El origen no está permitido. Por favor, verifica la configuración en Google Cloud Console y añade tu dominio a los orígenes autorizados.";
      }

      Swal.fire({
        icon: "error",
        title: "Error de autenticación",
        text: errorMessage,
      });
      return;
    }

    if (!token) {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      // El token puede ser idToken (JWT) o access_token
      let idToken = token;
      let userInfo = null;

      // Intentar decodificar como JWT (idToken)
      const decodeJwtPayload = (jwt) => {
        try {
          if (!jwt || typeof jwt !== "string" || !jwt.includes(".")) {
            return null;
          }
          const base64Url = jwt.split(".")[1];
          const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
          const padded = base64.padEnd(
            base64.length + ((4 - (base64.length % 4)) % 4),
            "="
          );
          const jsonPayload = decodeURIComponent(
            atob(padded)
              .split("")
              .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
              .join("")
          );
          return JSON.parse(jsonPayload);
        } catch {
          return null;
        }
      };

      const payload = decodeJwtPayload(token);

      // Si es un access_token (no es JWT válido), obtener info del usuario
      if (!payload && token) {
        try {
          userInfo = await fetch(
            "https://www.googleapis.com/oauth2/v2/userinfo",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          ).then((r) => {
            if (!r.ok) throw new Error("Error al obtener info del usuario");
            return r.json();
          });

          // Guardar usuario mínimo
          if (userInfo) {
            const minimalUser = {
              id: userInfo.id,
              name: userInfo.name || "",
              email: userInfo.email || "",
              avatar: userInfo.picture || "",
            };
            localStorage.setItem("user", JSON.stringify(minimalUser));
          }
        } catch (error) {
          console.error("Error al obtener info del usuario:", error);
        }
      } else if (payload) {
        // Es un idToken válido
        const minimalUser = {
          id: payload.sub,
          name:
            payload.name ||
            [payload.given_name, payload.family_name].filter(Boolean).join(" "),
          email: payload.email || "",
          avatar: payload.picture || "",
        };
        localStorage.setItem("user", JSON.stringify(minimalUser));
      }

      // Enviar al backend (puede ser idToken o access_token)
      const response = await api.post(apiRoutes.auth.google(), {
        token: idToken || token,
        access_token: idToken || token,
      });

      if (response.data) {
        const accessToken =
          response.data.access_token ||
          response.data.token ||
          response.data.accessToken ||
          response.data?.data?.access_token;

        if (accessToken) {
          localStorage.setItem("userToken", accessToken);
        }

        // Si el backend no devuelve user, ya guardamos uno mínimo; si lo devuelve, lo sustituimos
        const backendUser = response.data.user;
        if (backendUser) {
          localStorage.setItem("user", JSON.stringify(backendUser));
        }

        // También actualizar el contexto
        if (accessToken) {
          login(
            accessToken,
            backendUser || JSON.parse(localStorage.getItem("user"))
          );
        }
      }

      setLoading(false);
      Swal.fire({
        icon: "success",
        title: "¡Bienvenido!",
        text: "Has iniciado sesión con Google.",
        timer: 2000,
        showConfirmButton: false,
      }).then(() => {
        navigate("/user");
      });
    } catch (error) {
      setLoading(false);
      const errorMessage =
        (error.response?.data?.errors &&
          Object.values(error.response.data.errors).flat().join(" ")) ||
        error.response?.data?.message ||
        error.response?.data?.error ||
        "No se pudo iniciar sesión con Google.";

      Swal.fire({
        icon: "error",
        title: "Error",
        text: errorMessage,
      });
    }
  };

  return (
    <div
      className={`flex flex-col min-h-screen bg-linear-to-tr transition-colors duration-300 ${
        theme === "dark"
          ? "dark:from-slate-900 dark:to-slate-800 text-white"
          : "from-blue-100 to-white text-black"
      }`}
    >
      <HeaderAuth />

      <main className="flex-1 pt-64 pb-20 flex justify-center items-start px-4">
        <AuthForm
          onLogin={handleLogin}
          onRegister={handleRegister}
          onForgotPassword={handleForgotPassword}
          onLoginWithGoogle={handleGoogleAuth}
          initialTab={initialTab}
          loading={loading}
        />
      </main>

      <Footer />
    </div>
  );
}

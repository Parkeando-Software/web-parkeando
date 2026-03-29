import { useEffect, useRef } from "react";
import { Button } from "@components/ui/button";

export default function GoogleButton({ onClick, className = "", children, disabled = false, label }) {
  const googleAuthRef = useRef(null);
  const isInitialized = useRef(false);

  useEffect(() => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    if (!clientId || isInitialized.current) return;

    // Cargar el script de Google si no está cargado
    const loadGoogleScript = () => {
      return new Promise((resolve, reject) => {
        if (window.google && window.google.accounts && window.google.accounts.oauth2) {
          resolve();
          return;
        }

        const script = document.createElement("script");
        script.src = "https://accounts.google.com/gsi/client";
        script.async = true;
        script.defer = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error("Error al cargar Google"));
        document.head.appendChild(script);
      });
    };

    const initializeGoogle = async () => {
      try {
        await loadGoogleScript();

        // Inicializar OAuth2 (más confiable que One Tap)
        if (window.google.accounts.oauth2) {
          googleAuthRef.current = window.google.accounts.oauth2.initTokenClient({
            client_id: clientId,
            scope: "openid email profile",
        callback: async (response) => {
          if (response.error) {
            if (response.error !== "popup_closed_by_user") {
              console.error("Error en OAuth2:", response.error);
              // Pasar el error al handler para que lo maneje
              if (onClick && typeof onClick === 'function') {
                onClick(null, response.error);
              }
            }
            return;
          }
          
          // OAuth2 devuelve access_token
          if (response.access_token) {
            // Enviar el access_token directamente
            // El backend debería poder manejarlo como token
            onClick(response.access_token);
          }
        },
          });
        }

        isInitialized.current = true;
      } catch (error) {
        console.error("Error al inicializar Google:", error);
      }
    };

    initializeGoogle();
  }, [onClick]);

  const handleClick = () => {
    if (disabled) return;

    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    if (!clientId) {
      console.error("Google Client ID no configurado");
      return;
    }

    // Usar OAuth2 directamente (más confiable)
    if (googleAuthRef.current) {
      googleAuthRef.current.requestAccessToken();
    } else if (window.google && window.google.accounts && window.google.accounts.oauth2) {
      // Inicializar si no está inicializado
      googleAuthRef.current = window.google.accounts.oauth2.initTokenClient({
        client_id: clientId,
        scope: "openid email profile",
        callback: async (response) => {
          if (response.error) {
            if (response.error !== "popup_closed_by_user") {
              console.error("Error en OAuth2:", response.error);
            }
            return;
          }
          if (response.access_token) {
            onClick(response.access_token);
          }
        },
      });
      googleAuthRef.current.requestAccessToken();
    } else {
      // Cargar Google y reintentar
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.onload = () => {
        setTimeout(() => handleClick(), 500);
      };
      document.head.appendChild(script);
    }
  };

  return (
    <Button
      type="button"
      onClick={handleClick}
      variant="outline"
      disabled={disabled}
      className={`
        w-full bg-white dark:bg-slate-800 text-black border dark:text-slate-100 border-gray-300 shadow-sm
        hover:bg-gray-100 dark:hover:bg-slate-700 active:bg-gray-200 transition
        flex items-center justify-center gap-3 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
    >
      {/* Google Icon */}
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <g clipPath="url(#clip0_72_334)">
          <path
            d="M20 10.2216C20.0121 9.53416 19.9397 8.84776 19.7844 8.17725H10.2041V11.8883H15.8276C15.7211 12.539 15.4814 13.1618 15.1229 13.7194C14.7644 14.2769 14.2945 14.7577 13.7415 15.1327L13.7219 15.257L16.7512 17.5567L16.9609 17.5772C18.8883 15.8328 19.9996 13.266 19.9996 10.2216"
            fill="#4285F4"
          />
          <path
            d="M10.204 19.9998C12.959 19.9998 15.272 19.1109 16.9615 17.5775L13.7414 15.133C12.8798 15.722 11.7234 16.1332 10.204 16.1332C8.91366 16.1258 7.65844 15.7203 6.61645 14.9744C5.57445 14.2285 4.7986 13.1799 4.39897 11.9775L4.27938 11.9875L1.12955 14.3764L1.08838 14.4886C1.93671 16.1455 3.23861 17.5384 4.84851 18.5117C6.4584 19.485 8.31283 20.0002 10.2044 19.9998"
            fill="#34A853"
          />
          <path
            d="M4.39899 11.9777C4.1758 11.3411 4.06063 10.673 4.05807 9.99996C4.06218 9.32799 4.1731 8.66075 4.38684 8.02225L4.38115 7.88968L1.19269 5.4624L1.0884 5.51101C0.372763 6.90343 0 8.4408 0 9.99987C0 11.5589 0.372763 13.0963 1.0884 14.4887L4.39899 11.9777Z"
            fill="#FBBC05"
          />
          <path
            d="M10.2039 3.86687C11.6661 3.84462 13.0802 4.37827 14.1495 5.35583L17.0294 2.60021C15.1823 0.902092 12.7364 -0.0296414 10.2039 0.000207357C8.31236 -0.000233694 6.45795 0.514977 4.84805 1.48823C3.23816 2.46148 1.93625 3.85441 1.08789 5.51125L4.3875 8.02249C4.79107 6.8203 5.5695 5.77255 6.61303 5.02699C7.65655 4.28143 8.91255 3.87565 10.2039 3.86687Z"
            fill="#EB4335"
          />
        </g>
        <defs>
          <clipPath id="clip0_72_334">
            <rect width="20" height="20" fill="white" />
          </clipPath>
        </defs>
      </svg>

      {label || children || "Continuar con Google"}
    </Button>
  );
}

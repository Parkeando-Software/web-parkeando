import AppRoutes from "@/routes";
import { ThemeProvider } from "@/context/ThemeContext";
import { AuthProvider } from "@/context/AuthContext";
import { CookieProvider } from "@/context/CookieContext";
import CookieBanner from "@/components/CookieBanner";
import CookieSettings from "@/components/CookieSettings";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CookieProvider>
          <AppRoutes />
          <CookieBanner />
          <CookieSettings />
        </CookieProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

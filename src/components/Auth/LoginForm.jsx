import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import AnimatedInput from "@components/Auth/AnimatedInput";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@components/ui/button";
import GoogleButton from "@components/Auth/GoogleButton";

export default function LoginForm({
  formData,
  handleChange,
  onLogin,
  showPassLogin,
  setShowPassLogin,
  onForgotPassword,
  onLoginWithGoogle,
  loading = false,
}) {
  return (
    <motion.div
      key="loginForm"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.35 }}
      className="w-full"
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onLogin(formData.email, formData.password);
        }}
        className="space-y-4 p-2"
      >
        <AnimatedInput
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        <AnimatedInput
          label="Contraseña"
          type={showPassLogin ? "text" : "password"}
          name="password"
          value={formData.password}
          onChange={handleChange}
          icon={showPassLogin ? <EyeOff /> : <Eye />}
          onIconClick={() => setShowPassLogin(!showPassLogin)}
        />

        <Button
          type="submit"
          className="w-full bg-[#0083E6] hover:bg-[#005ba1] text-white cursor-pointer"
          disabled={loading}
        >
          {loading ? "Cargando..." : "Entrar"}
        </Button>

        <Link
          to="/forgot-password"
          className="text-[#0083E6] hover:underline text-sm w-full text-center mt-2 cursor-pointer block"
        >
          ¿Olvidaste tu contraseña?
        </Link>

        <GoogleButton onClick={onLoginWithGoogle} label="Iniciar con Google" disabled={loading} />
      </form>
    </motion.div>
  );
}

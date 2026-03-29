import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import AnimatedInput from "@components/Auth/AnimatedInput";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@components/ui/button";
import GoogleButton from "@components/Auth/GoogleButton";

export default function RegisterForm({
  formData,
  handleChange,
  onRegister,
  showPassRegister,
  setShowPassRegister,
  showConfirmPass,
  setShowConfirmPass,
  onLoginWithGoogle,
  setFormData,
  loading = false,
}) {
  return (
    <motion.div
      key="registerForm"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.35 }}
      className="w-full"
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();

          if (formData.password !== formData.confirmPassword) {
            return alert("Las contraseñas no coinciden");
          }

          if (!formData.acceptTerms) {
            return alert("Debes aceptar los términos y condiciones");
          }

          onRegister(
            formData.name,
            formData.email,
            formData.password,
            formData.acceptTerms
          );
        }}
        className="space-y-4 p-2"
      >
        <AnimatedInput
          label="Nombre de usuario"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />

        <AnimatedInput
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        <AnimatedInput
          label="Contraseña"
          type={showPassRegister ? "text" : "password"}
          name="password"
          value={formData.password}
          onChange={handleChange}
          icon={showPassRegister ? <EyeOff /> : <Eye />}
          onIconClick={() => setShowPassRegister(!showPassRegister)}
        />

        <AnimatedInput
          label="Confirmar contraseña"
          type={showConfirmPass ? "text" : "password"}
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          icon={showConfirmPass ? <EyeOff /> : <Eye />}
          onIconClick={() => setShowConfirmPass(!showConfirmPass)}
        />

        <label className="flex items-center gap-2 mt-2 text-sm">
          <input
            type="checkbox"
            name="acceptTerms"
            checked={formData.acceptTerms}
            onChange={(e) =>
              setFormData({
                ...formData,
                acceptTerms: e.target.checked,
              })
            }
            className="w-4 h-4 accent-[#0083E6]"
            required
          />
          Acepto los{" "}
          <Link to="/terms" className="text-[#0083E6] underline">
            Términos
          </Link>{" "}
          y la{" "}
          <Link to="/privacy" className="text-[#0083E6] underline">
            Privacidad
          </Link>
        </label>

        <Button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-800 dark:hover:bg-green-900 text-white cursor-pointer"
          disabled={loading}
        >
          {loading ? "Creando cuenta..." : "Crear cuenta"}
        </Button>

        <GoogleButton
          onClick={onLoginWithGoogle}
          label="Registrarse con Google"
          disabled={loading}
        />
      </form>
    </motion.div>
  );
}

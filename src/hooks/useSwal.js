import Swal from "sweetalert2";
import { useTheme } from "@context/ThemeContext";
import { useEffect, useMemo } from "react";

export function useSwal() {
  const { theme } = useTheme();

  const MySwal = useMemo(() => {
    const isDark = theme === "dark";
    
    return Swal.mixin({
      background: isDark ? "#1f2937" : "#ffffff",
      color: isDark ? "#f3f4f6" : "#1f2937",
      confirmButtonColor: "#3b82f6", // blue-500
      cancelButtonColor: isDark ? "#4b5563" : "#6b7280", // gray-600 : gray-500
      customClass: {
        popup: isDark ? "dark:bg-slate-800 dark:text-gray-100" : "",
        title: isDark ? "dark:text-white" : "",
        htmlContainer: isDark ? "dark:text-gray-300" : "",
      },
    });
  }, [theme]);

  return MySwal;
}

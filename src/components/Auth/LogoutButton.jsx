import React from "react";
import { Button } from "@components/ui/button";

export default function DashboardLogoutButton({ onLogout }) {
  return (
    <Button
      onClick={onLogout}
      className="bg-red-500 hover:bg-red-600 text-white"
    >
      Cerrar sesión
    </Button>
  );
}

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@context/ThemeContext";
import { useSwal } from "@hooks/useSwal";
import AdminDashboardHeader from "@components/Dashboard/AdminDashboard/AdminDashboardHeader";
import AdminSidebar from "@components/Dashboard/AdminDashboard/AdminSidebar";
import DashboardSection from "@components/Dashboard/AdminDashboard/Sections/DashboardSection";
import UsuariosSection from "@components/Dashboard/AdminDashboard/Sections/UsuariosSection";
import ParkingsSection from "@components/Dashboard/AdminDashboard/Sections/ParkingsSection";
import SorteosSection from "@components/Dashboard/AdminDashboard/Sections/SorteosSection";
import AnalisisSection from "@components/Dashboard/AdminDashboard/Sections/AnalisisSection";
import ConfiguracionSection from "@components/Dashboard/AdminDashboard/Sections/ConfiguracionSection";
import GuiaSection from "@components/Dashboard/AdminDashboard/Sections/GuiaSection";
import AppStoreSection from "@components/Dashboard/AdminDashboard/Sections/AppStoreSection";
import EmailsSection from "@components/Dashboard/AdminDashboard/Sections/EmailsSection";
import ReviewFormModal from "@components/Dashboard/AdminDashboard/Modals/ReviewFormModal";
import api from "@config/api";
import apiRoutes from "@config/apiRoutes";

// Import Dashboard Section Components
import StatsOverview from "@components/Dashboard/AdminDashboard/StatsOverview";
import QuickActions from "@components/Dashboard/AdminDashboard/QuickActions";
import RecentActivity from "@components/Dashboard/AdminDashboard/RecentActivity";
import UserFormModal from "@components/Dashboard/AdminDashboard/Modals/UserFormModal";
import ParkingFormModal from "@components/Dashboard/AdminDashboard/Modals/ParkingFormModal";
import RaffleFormModal from "@components/Dashboard/AdminDashboard/Modals/RaffleFormModal";

export default function AdminDashboard() {
  const { theme } = useTheme();
  const [activeSection, setActiveSection] = useState("dashboard");
  const [sectionAction, setSectionAction] = useState(null);

  // Dashboard specific state
  const [showUserModal, setShowUserModal] = useState(false);
  const [showParkingModal, setShowParkingModal] = useState(false);
  const [showRaffleModal, setShowRaffleModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const swal = useSwal();

  const handleNavigate = (section, action = null) => {
    setActiveSection(section);
    if (action) {
      setSectionAction(action);
    }
  };

  const handleCreateReview = async (reviewData) => {
    try {
      await api.post(apiRoutes.admin.appStore.storeReview(), reviewData);
      swal.fire({
        title: "¡Éxito!",
        text: "Reseña creada correctamente",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
      setShowReviewModal(false);
    } catch (error) {
      swal.fire({
        title: "Error",
        text: "No se pudo crear la reseña",
        icon: "error",
      });
    }
  };

  // Section titles mapping
  const sectionTitles = {
    dashboard: "Panel de Administración",
    usuarios: "Gestión de Usuarios",
    parkings: "Gestión de Parkings",
    sorteos: "Gestión de Sorteos",
    appstore: "Gestión de App Store",
    emails: "Gestión de Emails",
    analisis: "Análisis y Estadísticas",
    configuracion: "Configuración",
    guia: "Guía de Administración",
  };

  // Render section based on activeSection
  const renderSection = () => {
    switch (activeSection) {
      case "dashboard":
        return (
          <div className="space-y-6">
            <StatsOverview onSectionChange={handleNavigate} />

            <QuickActions
              onNavigate={handleNavigate}
              onCreateUser={() => setShowUserModal(true)}
              onCreateParking={() => setShowParkingModal(true)}
              onCreateRaffle={() => setShowRaffleModal(true)}
              onCreateReview={() => setShowReviewModal(true)}
            />

            <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
              <RecentActivity />
            </div>
          </div>
        );
      case "usuarios":
        return (
          <UsuariosSection
            initialAction={sectionAction}
            clearAction={() => setSectionAction(null)}
          />
        );
      case "parkings":
        return (
          <ParkingsSection
            initialAction={sectionAction}
            clearAction={() => setSectionAction(null)}
          />
        );
      case "sorteos":
        return (
          <SorteosSection
            initialAction={sectionAction}
            clearAction={() => setSectionAction(null)}
          />
        );
      case "appstore":
        return <AppStoreSection />;
      case "emails":
        return <EmailsSection />;
      case "analisis":
        return <AnalisisSection />;
      case "configuracion":
        return <ConfiguracionSection />;
      case "guia":
        return <GuiaSection />;
      default:
        return <DashboardSection onNavigate={handleNavigate} />;
    }
  };

  return (
    <div
      className={`min-h-screen bg-linear-to-br ${
        theme === "dark"
          ? "from-slate-900 via-slate-800 to-slate-900"
          : "from-blue-50 via-white to-purple-50"
      } transition-colors duration-300`}
    >
      {/* Header */}
      <AdminDashboardHeader
        activeSection={activeSection}
        onSectionChange={handleNavigate}
      />

      {/* Sidebar */}
      <AdminSidebar
        activeSection={activeSection}
        onSectionChange={handleNavigate}
      />

      {/* Main Content */}
      <main className="lg:ml-64 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Title - Only show for dashboard section */}
          {activeSection === "dashboard" && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h1 className="text-4xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                {sectionTitles[activeSection]}
              </h1>
              <p className="text-muted-foreground">
                Bienvenido al panel de control de Parkeando
              </p>
            </motion.div>
          )}

          {/* Render Active Section */}
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderSection()}
          </motion.div>
        </div>
      </main>

      {/* Modals */}
      {showUserModal && (
        <UserFormModal
          isOpen={showUserModal}
          onClose={() => setShowUserModal(false)}
          onSuccess={() => {
            setShowUserModal(false);
          }}
        />
      )}

      {showParkingModal && (
        <ParkingFormModal
          isOpen={showParkingModal}
          onClose={() => setShowParkingModal(false)}
          onSuccess={() => {
            setShowParkingModal(false);
          }}
        />
      )}

      {showRaffleModal && (
        <RaffleFormModal
          isOpen={showRaffleModal}
          onClose={() => setShowRaffleModal(false)}
          onSuccess={() => {
            setShowRaffleModal(false);
          }}
        />
      )}

      {showReviewModal && (
        <ReviewFormModal
          onSave={handleCreateReview}
          onClose={() => setShowReviewModal(false)}
        />
      )}
    </div>
  );
}

import React from "react";
import { useProfileData } from "@utils/profile-data";
import ProfileIdentity from "@components/Dashboard/UserDashboard/Tabs/Profile/ProfileIdentity";
import ProfileStats from "@components/Dashboard/UserDashboard/Tabs/Profile/ProfileStats";
import ProfileDetails from "@components/Dashboard/UserDashboard/Tabs/Profile/ProfileDetails";
import ProfileDanger from "@components/Dashboard/UserDashboard/Tabs/Profile/ProfileDanger";

export default function Profile() {
  const {
    loading,
    originalData,
    formData,
    userInitials,
    isEditing,
    isEditingAvatar,
    totalVehicles,
    releasedParkings,
    occupiedParkings,
    handleEdit,
    handleSave,
    handleCancel,
    handleChange,
    handleCityChange,
    handleAvatarChange,
    handleAvatarEdit,
    handleAvatarSave,
    handleAvatarCancel,
  } = useProfileData();

  // Loading State (Skeleton Completo)
  if (loading && !originalData) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-pulse">
        <div className="h-96 bg-slate-200 dark:bg-slate-800 rounded-2xl"></div>
        <div className="lg:col-span-2 space-y-6">
          <div className="flex gap-4">
            <div className="h-32 w-1/3 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
            <div className="h-32 w-1/3 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
            <div className="h-32 w-1/3 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
          </div>
          <div className="h-64 bg-slate-200 dark:bg-slate-800 rounded-2xl"></div>
          <div className="h-24 bg-red-100 dark:bg-red-900/10 rounded-2xl"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Columna Izquierda: Identidad */}
      <ProfileIdentity 
        formData={formData}
        isEditing={isEditing}
        isEditingAvatar={isEditingAvatar}
        handleAvatarChange={handleAvatarChange}
        handleAvatarEdit={handleAvatarEdit}
        handleAvatarSave={handleAvatarSave}
        handleAvatarCancel={handleAvatarCancel}
      />

      {/* Columna Derecha: Detalles, Stats y Peligro */}
      <div className="lg:col-span-2 space-y-6">
        {/* Stats */}
        <ProfileStats
          totalVehicles={totalVehicles}
          releasedParkings={releasedParkings}
          occupiedParkings={occupiedParkings}
        />

        {/* Formulario */}
        <ProfileDetails
          isEditing={isEditing}
          loading={loading}
          formData={formData}
          handleEdit={handleEdit}
          handleSave={handleSave}
          handleCancel={handleCancel}
          handleChange={handleChange}
          handleCityChange={handleCityChange}
        />

        {/* Danger Zone */}
        <ProfileDanger />
      </div>
    </div>
  );
}
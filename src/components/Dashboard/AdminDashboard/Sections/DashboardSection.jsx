import React, { useState } from 'react';
import { motion } from 'framer-motion';
import StatsOverview from '../StatsOverview';
import QuickActions from '../QuickActions';
import RecentActivity from '../RecentActivity';
import UserFormModal from '../Modals/UserFormModal';
import ParkingFormModal from '../Modals/ParkingFormModal';
import RaffleFormModal from '../Modals/RaffleFormModal';

export default function DashboardSection({ onNavigate }) {
  const [showUserModal, setShowUserModal] = useState(false);
  const [showParkingModal, setShowParkingModal] = useState(false);
  const [showRaffleModal, setShowRaffleModal] = useState(false);

  return (
    <div className="space-y-8">
      {/* Stats Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <StatsOverview onSectionChange={onNavigate} />
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <QuickActions 
          onNavigate={onNavigate}
          onCreateUser={() => setShowUserModal(true)}
          onCreateParking={() => setShowParkingModal(true)}
          onCreateRaffle={() => setShowRaffleModal(true)}
        />
      </motion.div>

      {/* Recent Activity - Full Width */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <RecentActivity onNavigate={onNavigate} />
      </motion.div>

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
    </div>
  );
}

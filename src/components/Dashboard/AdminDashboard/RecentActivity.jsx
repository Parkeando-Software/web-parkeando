import React, { useState, useEffect } from 'react';
import { UserPlus, MapPin, Trophy, AlertCircle, Loader2 } from 'lucide-react';
import ActivityItem from './ActivityItem';
import { Card, CardHeader, CardTitle, CardContent } from '@components/ui/card';
import * as adminUserService from '@services/adminUserService';
import * as adminParkingService from '@services/adminParkingService';
import * as adminRaffleService from '@services/adminRaffleService';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

export default function RecentActivity({ onNavigate }) {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const [usersRes, parkingsRes, rafflesRes] = await Promise.all([
          adminUserService.getUsers({ per_page: 5, sort_by: 'created_at', sort_order: 'desc' }),
          adminParkingService.getParkings({ per_page: 5, sort_by: 'created_at', sort_order: 'desc' }),
          adminRaffleService.getRaffles({ per_page: 5, sort_by: 'created_at', sort_order: 'desc' })
        ]);

        const newActivities = [];

        // Process users
        if (usersRes.data) {
          usersRes.data.forEach(user => {
            newActivities.push({
              type: 'usuarios',
              id: user.id,
              date: new Date(user.created_at),
              icon: <UserPlus className="w-4 h-4 text-white" />,
              iconBg: 'bg-emerald-500',
              title: 'Nuevo usuario registrado',
              description: `${user.name || user.username} se unió a la plataforma`,
            });
          });
        }

        // Process parkings
        if (parkingsRes.data) {
          parkingsRes.data.forEach(parking => {
            newActivities.push({
              type: 'parkings',
              id: parking.id,
              date: new Date(parking.created_at),
              icon: <MapPin className="w-4 h-4 text-white" />,
              iconBg: 'bg-blue-500',
              title: 'Nueva plaza de parking',
              description: `Plaza creada en ${parking.latitude.toFixed(4)}, ${parking.longitude.toFixed(4)}`,
            });
          });
        }

        // Process raffles
        if (rafflesRes.data) {
          rafflesRes.data.forEach(raffle => {
            newActivities.push({
              type: 'sorteos',
              id: raffle.id,
              date: new Date(raffle.created_at),
              icon: <Trophy className="w-4 h-4 text-white" />,
              iconBg: 'bg-orange-500',
              title: 'Nuevo sorteo creado',
              description: raffle.title,
            });
          });
        }

        // Sort by date desc and take top 10
        newActivities.sort((a, b) => b.date - a.date);
        setActivities(newActivities.slice(0, 10));

      } catch (error) {
        console.error('Error fetching recent activity:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivity();
  }, []);

  const formatTime = (date) => {
    try {
      return formatDistanceToNow(date, { addSuffix: true, locale: es });
    } catch (e) {
      return 'Hace un momento';
    }
  };

  const handleActivityClick = (activity) => {
    if (onNavigate && activity.type) {
      onNavigate(activity.type);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Actividad Reciente</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : activities.length > 0 ? (
          <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
            {activities.map((activity, index) => (
              <ActivityItem 
                key={index} 
                {...activity} 
                time={formatTime(activity.date)}
                onClick={() => handleActivityClick(activity)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            No hay actividad reciente
          </div>
        )}
      </CardContent>
    </Card>
  );
}

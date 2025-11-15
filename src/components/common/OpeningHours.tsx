import { Clock } from 'lucide-react';
import { useEffect, useState } from 'react';

interface OpeningHoursProps {
  showTitle?: boolean;
  compact?: boolean;
}

const OpeningHours = ({ showTitle = true, compact = false }: OpeningHoursProps) => {
  const [currentStatus, setCurrentStatus] = useState<{ isOpen: boolean; message: string }>({
    isOpen: false,
    message: 'Fermé',
  });

  const schedule = [
    { day: 'Lundi', hours: '07h00 - 12h00 | 14h00 - 18h00', dayNum: 1 },
    { day: 'Mardi', hours: '07h00 - 12h00 | 14h00 - 18h00', dayNum: 2 },
    { day: 'Mercredi', hours: '07h00 - 12h00 | 14h00 - 18h00', dayNum: 3 },
    { day: 'Jeudi', hours: '07h00 - 12h00 | 14h00 - 18h00', dayNum: 4 },
    { day: 'Vendredi', hours: '07h00 - 12h00 | 14h00 - 18h00', dayNum: 5 },
    { day: 'Samedi', hours: '07h00 - 12h00', dayNum: 6 },
    { day: 'Dimanche', hours: 'Fermé', dayNum: 0 },
  ];

  useEffect(() => {
    const checkStatus = () => {
      const now = new Date();
      const currentDay = now.getDay();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      const currentTime = currentHour * 60 + currentMinute;

      if (currentDay === 0) {
        setCurrentStatus({ isOpen: false, message: 'Fermé - Ouvre lundi à 07h00' });
        return;
      }

      if (currentDay === 6) {
        // Samedi
        if (currentTime >= 7 * 60 && currentTime < 12 * 60) {
          setCurrentStatus({ isOpen: true, message: 'Ouvert maintenant' });
        } else {
          setCurrentStatus({ isOpen: false, message: 'Fermé - Ouvre lundi à 07h00' });
        }
      } else {
        // Lundi - Vendredi
        if ((currentTime >= 7 * 60 && currentTime < 12 * 60) || 
            (currentTime >= 14 * 60 && currentTime < 18 * 60)) {
          setCurrentStatus({ isOpen: true, message: 'Ouvert maintenant' });
        } else if (currentTime < 7 * 60) {
          setCurrentStatus({ isOpen: false, message: 'Fermé - Ouvre à 07h00' });
        } else if (currentTime >= 12 * 60 && currentTime < 14 * 60) {
          setCurrentStatus({ isOpen: false, message: 'Fermé - Ouvre à 14h00' });
        } else {
          const nextDay = currentDay === 5 ? 'lundi' : 'demain';
          setCurrentStatus({ isOpen: false, message: `Fermé - Ouvre ${nextDay} à 07h00` });
        }
      }
    };

    checkStatus();
    const interval = setInterval(checkStatus, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  if (compact) {
    return (
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          {currentStatus.isOpen ? (
            <span className="flex items-center gap-1 text-sm text-green-600 font-medium">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              {currentStatus.message}
            </span>
          ) : (
            <span className="flex items-center gap-1 text-sm text-red-600 font-medium">
              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
              {currentStatus.message}
            </span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {showTitle && (
        <div className="flex items-center gap-2 mb-4">
          <Clock className="h-6 w-6 text-elvec-600" />
          <h3 className="text-xl font-bold text-gray-900">Nos Horaires d'Ouverture</h3>
        </div>
      )}

      <div className="mb-4">
        {currentStatus.isOpen ? (
          <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-2 rounded-md">
            <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
            <span className="font-semibold">{currentStatus.message}</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 bg-red-50 text-red-700 px-3 py-2 rounded-md">
            <span className="w-3 h-3 bg-red-500 rounded-full"></span>
            <span className="font-semibold">{currentStatus.message}</span>
          </div>
        )}
      </div>

      <div className="space-y-2">
        {schedule.map((item) => (
          <div
            key={item.day}
            className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0"
          >
            <span className="font-medium text-gray-700">{item.day}</span>
            <span className="font-mono text-sm text-gray-600">{item.hours}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OpeningHours;

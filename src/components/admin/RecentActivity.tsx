import { Card } from '@/components/ui/card';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Calendar, FileText, GraduationCap, MessageSquare } from 'lucide-react';

interface Activity {
  id: string;
  type: 'appointment' | 'quote' | 'training' | 'message';
  title: string;
  description: string;
  timestamp: Date;
}

interface RecentActivityProps {
  activities: Activity[];
}

const iconMap = {
  appointment: Calendar,
  quote: FileText,
  training: GraduationCap,
  message: MessageSquare,
};

const colorMap = {
  appointment: 'bg-purple-100 text-purple-600',
  quote: 'bg-orange-100 text-orange-600',
  training: 'bg-red-100 text-red-600',
  message: 'bg-green-100 text-green-600',
};

const RecentActivity = ({ activities }: RecentActivityProps) => {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Activité Récente</h3>
      <div className="space-y-4">
        {activities.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-8">Aucune activité récente</p>
        ) : (
          activities.map((activity) => {
            const Icon = iconMap[activity.type];
            return (
              <div key={activity.id} className="flex gap-3 items-start">
                <div className={`p-2 rounded-lg ${colorMap[activity.type]}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{activity.title}</p>
                  <p className="text-xs text-gray-500 truncate">{activity.description}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {formatDistanceToNow(activity.timestamp, { addSuffix: true, locale: fr })}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </Card>
  );
};

export default RecentActivity;

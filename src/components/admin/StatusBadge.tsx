import { Badge } from '@/components/ui/badge';

interface StatusBadgeProps {
  status: string;
}

const statusConfig: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
  nouveau: { label: 'Nouveau', variant: 'default' },
  lu: { label: 'Lu', variant: 'secondary' },
  traite: { label: 'Traité', variant: 'outline' },
  archive: { label: 'Archivé', variant: 'secondary' },
  pending: { label: 'En attente', variant: 'default' },
  confirmed: { label: 'Confirmé', variant: 'outline' },
  completed: { label: 'Terminé', variant: 'secondary' },
  cancelled: { label: 'Annulé', variant: 'destructive' },
};

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const config = statusConfig[status] || { label: status, variant: 'default' as const };
  
  return (
    <Badge variant={config.variant} className="capitalize">
      {config.label}
    </Badge>
  );
};

export default StatusBadge;

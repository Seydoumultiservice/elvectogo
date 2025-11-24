-- Activer realtime pour la table vehicles
ALTER TABLE vehicles REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE vehicles;

-- Activer realtime pour la table vehicle_reservations
ALTER TABLE vehicle_reservations REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE vehicle_reservations;
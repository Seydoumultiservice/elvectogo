-- Create quotes table for quote requests
create table public.quotes (
  id uuid primary key default gen_random_uuid(),
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  nom text not null,
  telephone text not null,
  email text,
  adresse text,
  besoin text not null,
  status text default 'pending' check (status in ('pending', 'en_cours', 'traite', 'refuse')),
  notes text
);

-- Enable RLS
alter table public.quotes enable row level security;

-- Policy: Anyone can create quotes
create policy "Anyone can create quotes"
  on public.quotes for insert
  with check (true);

-- Policy: Only admins can view quotes
create policy "Only admins can view quotes"
  on public.quotes for select
  using (has_role(auth.uid(), 'admin'));

-- Policy: Only admins can update quotes
create policy "Only admins can update quotes"
  on public.quotes for update
  using (has_role(auth.uid(), 'admin'));

-- Trigger for updated_at
create trigger quotes_updated_at
  before update on public.quotes
  for each row
  execute function public.update_updated_at_column();

-- Create training_registrations table
create table public.training_registrations (
  id uuid primary key default gen_random_uuid(),
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  nom_complet text not null,
  telephone text not null,
  email text,
  formation_type text not null,
  niveau_experience text check (niveau_experience in ('debutant', 'intermediaire', 'avance')),
  date_souhaitee date,
  message text,
  status text default 'pending' check (status in ('pending', 'accepte', 'rejete', 'complete')),
  notes text
);

-- Enable RLS
alter table public.training_registrations enable row level security;

-- Policy: Anyone can create registrations
create policy "Anyone can create training registrations"
  on public.training_registrations for insert
  with check (true);

-- Policy: Only admins can view registrations
create policy "Only admins can view training registrations"
  on public.training_registrations for select
  using (has_role(auth.uid(), 'admin'));

-- Policy: Only admins can update registrations
create policy "Only admins can update training registrations"
  on public.training_registrations for update
  using (has_role(auth.uid(), 'admin'));

-- Trigger for updated_at
create trigger training_registrations_updated_at
  before update on public.training_registrations
  for each row
  execute function public.update_updated_at_column();
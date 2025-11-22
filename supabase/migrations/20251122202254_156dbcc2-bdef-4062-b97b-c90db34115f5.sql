-- Create table for before/after project transformations
CREATE TABLE public.project_transformations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_before TEXT NOT NULL,
  image_after TEXT NOT NULL,
  category TEXT,
  visible BOOLEAN DEFAULT true,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.project_transformations ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Transformations viewable by everyone" 
ON public.project_transformations 
FOR SELECT 
USING ((visible = true) OR has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Only admins can manage transformations" 
ON public.project_transformations 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_project_transformations_updated_at
BEFORE UPDATE ON public.project_transformations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime for admin notifications
ALTER PUBLICATION supabase_realtime ADD TABLE public.quotes;
ALTER PUBLICATION supabase_realtime ADD TABLE public.training_registrations;
ALTER PUBLICATION supabase_realtime ADD TABLE public.contact_messages;
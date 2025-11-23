-- Fix security warning: Drop trigger first, then recreate function with search_path
DROP TRIGGER IF EXISTS trigger_update_conversation_ended_at ON chat_conversations;
DROP FUNCTION IF EXISTS update_conversation_ended_at();

-- Recreate function with security definer and search_path
CREATE OR REPLACE FUNCTION update_conversation_ended_at()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.status = 'closed' AND OLD.status != 'closed' THEN
    NEW.ended_at = NOW();
  END IF;
  RETURN NEW;
END;
$$;

-- Recreate trigger
CREATE TRIGGER trigger_update_conversation_ended_at
BEFORE UPDATE ON chat_conversations
FOR EACH ROW
EXECUTE FUNCTION update_conversation_ended_at();
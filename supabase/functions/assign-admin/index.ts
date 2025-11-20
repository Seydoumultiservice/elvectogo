import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.81.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('🚀 Starting admin role assignment...');

    // Créer un client Supabase avec le service role key (privilèges complets)
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    );

    // L'ID de l'utilisateur admin que nous voulons promouvoir
    const adminUserId = '0a4195dc-68e8-4ff6-8cf3-b7da291a2a6a';
    const adminEmail = 'adminelvec@elvectogo.com';

    // Vérifier si un admin existe déjà
    const { data: existingAdmins, error: checkError } = await supabaseAdmin
      .from('user_roles')
      .select('*')
      .eq('role', 'admin');

    if (checkError) {
      console.error('❌ Error checking existing admins:', checkError);
      throw checkError;
    }

    if (existingAdmins && existingAdmins.length > 0) {
      console.log('⚠️ Admin already exists, skipping creation');
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Un administrateur existe déjà dans le système.',
          alreadyExists: true
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200 
        }
      );
    }

    // Vérifier que l'utilisateur existe
    const { data: userData, error: userError } = await supabaseAdmin.auth.admin.getUserById(adminUserId);

    if (userError || !userData) {
      console.error('❌ User not found:', userError);
      throw new Error(`Utilisateur non trouvé: ${adminEmail}`);
    }

    console.log('✅ User found:', userData.user.email);

    // Insérer le rôle admin (bypass RLS avec service role key)
    const { error: insertError } = await supabaseAdmin
      .from('user_roles')
      .insert({
        user_id: adminUserId,
        role: 'admin'
      });

    if (insertError) {
      console.error('❌ Error inserting admin role:', insertError);
      throw insertError;
    }

    console.log('✅ Admin role assigned successfully!');

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Rôle administrateur attribué avec succès à ${adminEmail}`,
        userId: adminUserId
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('❌ Error in assign-admin function:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400 
      }
    );
  }
});

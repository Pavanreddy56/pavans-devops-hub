import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.81.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )

    const { username, password } = await req.json()

    if (!username || !password) {
      throw new Error('Username and password are required')
    }

    console.log('Creating user with username:', username)

    // Create user with admin service role
    const { data: user, error: signUpError } = await supabaseAdmin.auth.admin.createUser({
      email: `${username.toLowerCase()}@admin.local`,
      password: password,
      email_confirm: true,
      user_metadata: {
        username: username
      }
    })

    if (signUpError) {
      console.error('SignUp error:', signUpError)
      throw signUpError
    }

    console.log('User created:', user.user.id)

    // Wait a bit for the trigger to create the profile
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Insert admin role
    const { error: roleError } = await supabaseAdmin
      .from('user_roles')
      .insert({
        user_id: user.user.id,
        role: 'admin'
      })

    if (roleError && roleError.code !== '23505') { // Ignore duplicate key error
      console.error('Role creation error:', roleError)
      throw roleError
    }

    console.log('Admin role assigned')

    return new Response(
      JSON.stringify({ success: true, user: user.user }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
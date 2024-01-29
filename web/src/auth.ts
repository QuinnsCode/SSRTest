import { createClient } from '@supabase/supabase-js'

import { createAuth } from '@redwoodjs/auth-supabase-web'

import { Database } from '../../database.types'

const supabaseClient = createClient<Database>(
  process.env.SUPABASE_URL || '',
  process.env.SUPABASE_KEY || ''
)

export const { AuthProvider, useAuth } = createAuth(supabaseClient)

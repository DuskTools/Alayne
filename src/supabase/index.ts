// Import the functions you need from the SDKs you need
import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'
import { Database } from '../database.types.js'
config()

export default createClient<Database>(process.env.SUPABASE_URL!, process.env.SUPABASE_PUBLIC_ANON_KEY!)

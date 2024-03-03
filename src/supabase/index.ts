// Import the functions you need from the SDKs you need
import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'
import { Database } from '../database.types'
config()

export default createClient<Database>(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!)

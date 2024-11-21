// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

// Replace with your own Supabase URL and API Key
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default supabase;

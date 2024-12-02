import { createClient } from "@supabase/supabase-js";
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Las variables de entorno SUPABASE_URL y SUPABASE_KEY deben estar definidas");
}

export const supabase = createClient(supabaseUrl, supabaseKey);

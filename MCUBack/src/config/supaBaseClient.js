import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SECRET_API_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Supabase env variables are not defined');
}

export const supabase = createClient(
    supabaseUrl,
    supabaseServiceKey,
    {
        auth: {
            persistSession: false,
            autoRefreshToken: false
        }
    }
)
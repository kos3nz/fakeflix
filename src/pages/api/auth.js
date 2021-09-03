import { supabase } from 'db/supabaseClient';

export default function handler(req, res) {
  console.log(req.body);
  supabase.auth.api.setAuthCookie(req, res);
}

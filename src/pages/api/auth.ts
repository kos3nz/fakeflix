import { supabase } from 'db/supabaseClient';
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.body);
  supabase.auth.api.setAuthCookie(req, res);
}

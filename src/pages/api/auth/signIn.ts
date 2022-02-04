import { supabase } from 'db/supabaseClient';
import { NextApiRequest, NextApiResponse } from 'next';

const signIn = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body;

  const { data: session, error } = await supabase.auth.api.signInWithEmail(
    email,
    password
  );

  if (error) return res.status(401).json({ error });

  return res.status(200).json({ session });
};

export default signIn;

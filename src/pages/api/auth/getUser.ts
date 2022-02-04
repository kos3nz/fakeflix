import { supabase } from 'db/supabaseClient';
import { NextApiRequest, NextApiResponse } from 'next';

const getUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const { data: user, error } = await supabase.auth.api.getUserByCookie(req);

  if (error) return res.status(401).json({ error });

  return res.status(200).json({ user });
};

export default getUser;

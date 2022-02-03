import { createClient } from '@supabase/supabase-js';
import { IncomingMessage } from 'http';
import { NextApiRequestCookies } from 'next/dist/server/api-utils';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// use this function in getServerSideProps
export const checkUser = async (
  req: IncomingMessage & {
    cookies: NextApiRequestCookies;
  },
  to: string = '/login'
) => {
  const { user } = await supabase.auth.api.getUserByCookie(req);

  const redirect = redirectTo(to);

  return { user, redirect };
};

const redirectTo = (to: string) => {
  return {
    props: {},
    redirect: {
      destination: to,
      permanent: false,
    },
  };
};

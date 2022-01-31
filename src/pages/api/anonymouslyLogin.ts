// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next';

export interface AnonymousUser {
  name: string;
}

export interface AnonymousSession {
  sessionCreated: Date;
  user: AnonymousUser;
}

export interface AnonymousData {
  session: AnonymousSession;
}

export default function anonymouslyLogin(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.status(200).json({
    session: {
      sessionCreated: Date.now(),
      user: {
        name: 'anonymous',
      },
    },
  });
}

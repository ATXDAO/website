// from https://wagmi.sh/examples/sign-in-with-ethereum
import { IronSession, IronSessionOptions } from 'iron-session';
import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';
import { generateNonce } from 'siwe';

export interface Session extends IronSession {
  nonce: string;
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { method } = req;
  const session = req.session as Session;
  switch (method) {
    case 'GET':
      session.nonce = generateNonce();
      await session.save();
      res.setHeader('Content-Type', 'text/plain').send(session.nonce);
      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

if (!process.env.NEXT_SESSION_PRIVATE_KEY) {
  throw new Error('require env var: NEXT_SESSION_PRIVATE_KEY');
}

const sessionOptions: IronSessionOptions = {
  cookieName: 'siwe',
  password: process.env.NEXT_SESSION_PRIVATE_KEY,
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
};

export default withIronSessionApiRoute(handler, sessionOptions);

// from https://wagmi.sh/examples/sign-in-with-ethereum
import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';
import { generateNonce } from 'siwe';
import { Session, sessionOptions } from 'utils/session';

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

export default withIronSessionApiRoute(handler, sessionOptions);

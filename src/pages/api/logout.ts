// from https://wagmi.sh/examples/sign-in-with-ethereum
import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';
import { sessionOptions } from 'utils/session';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { method } = req;
  switch (method) {
    case 'GET':
      req.session.destroy();
      res.setHeader('cache-control', 'no-store, max-age=0');
      res.send({ ok: true });
      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default withIronSessionApiRoute(handler, sessionOptions);

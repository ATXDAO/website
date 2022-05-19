// from https://wagmi.sh/examples/sign-in-with-ethereum
import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';
import { authUser } from 'utils/auth';
import { sessionOptions } from 'utils/session';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { method } = req;
  switch (method) {
    case 'GET': {
      const authRes = await authUser(req.session.siwe);
      if (authRes.valid) {
        res
          .status(200)
          .send({ nftOwner: authRes.nftOwner, address: authRes.siwe.address });
      } else {
        console.log(authRes);
        res.status(401).send({ error: authRes.errorMessage });
      }
      break;
    }
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default withIronSessionApiRoute(handler, sessionOptions);

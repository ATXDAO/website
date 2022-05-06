// from https://wagmi.sh/examples/sign-in-with-ethereum

/* eslint-disable consistent-return */
import eventbrite from 'eventbrite';
import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';
import { authUser } from 'utils/auth';
import { sessionOptions, Session } from 'utils/session';

const eventbriteAPI = process.env.NEXT_PRIVATE_EVENTBRITE_KEY;
const orgID = process.env.NEXT_PRIVATE_EVENTBRITE_ORGID;

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { method } = req;
  switch (method) {
    case 'GET': {
      const { siwe } = req.session as Session;
      const authRes = await authUser(siwe);
      if (!authRes.valid) {
        res.status(401).json({ error: authRes.errorMessage });
      } else {
        const sdk = eventbrite({ token: `${eventbriteAPI}` });
        const data = await sdk.request(`/organizations/${orgID}/events/`);
        res.status(200).json({ data });
      }
      break;
    }
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default withIronSessionApiRoute(handler, sessionOptions);

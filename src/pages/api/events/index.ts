// from https://wagmi.sh/examples/sign-in-with-ethereum

/* eslint-disable consistent-return */
import eventbrite from 'eventbrite';
import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';
import { sessionOptions } from 'utils/session';

const eventbriteAPI = process.env.NEXT_PRIVATE_EVENTBRITE_KEY;
const orgID = process.env.NEXT_PRIVATE_EVENTBRITE_ORGID;

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { method } = req;
  switch (method) {
    case 'GET': {
      const sdk = eventbrite({ token: `${eventbriteAPI}` });
      const data = await sdk.request(`/organizations/${orgID}/events/`);
      res.status(200).json({ data });
      break;
    }
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default withIronSessionApiRoute(handler, sessionOptions);

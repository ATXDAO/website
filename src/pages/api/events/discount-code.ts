/* eslint-disable no-console */
// from https://wagmi.sh/examples/sign-in-with-ethereum

/* eslint-disable consistent-return */
import axios from 'axios';
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
      const { eventCode } = req.query;
      if (!eventCode) {
        res.status(400).json({ error: 'expected eventCode in query params' });
        break;
      }
      const { siwe } = req.session as Session;
      const authRes = await authUser(siwe);
      if (!authRes.valid) {
        res.status(401).json({ error: authRes.errorMessage });
      } else {
        const code = `atx-${authRes.siwe.address}`;
        const body = {
          discount: {
            type: 'access',
            code,
            event_id: `${eventCode}`,
            ticket_class_ids: [],
            quantity_available: 1,
          },
        };

        const { status, data } = await axios({
          method: 'post',
          url: `https://www.eventbriteapi.com/v3/organizations/${orgID}/discounts/`,
          data: body,
          headers: {
            Authorization: `Bearer ${eventbriteAPI}`,
          },
        });
        if (status === 200) {
          res.status(200).json({ code });
        } else {
          console.error({ error: 'error from eventbrite api', data });
          res.status(500).json({ error: 'eventbrite api error' });
        }
      }
      break;
    }
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default withIronSessionApiRoute(handler, sessionOptions);
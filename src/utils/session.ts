import { IronSession, IronSessionOptions } from 'iron-session';
import { SiweMessage } from 'siwe';

export interface Siwe {
  address: string;
}

export interface Session extends IronSession {
  nonce: string;
  siwe?: SiweMessage;
}

export const sessionOptions: IronSessionOptions = {
  cookieName: 'siwe',
  password: process.env.NEXT_SESSION_PRIVATE_KEY || '',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
};
import { IronSession, IronSessionOptions } from 'iron-session';

export interface Siwe {
  address: string;
}

export interface Session extends IronSession {
  nonce: string;
  siwe?: Siwe;
}

export const sessionOptions: IronSessionOptions = {
  cookieName: 'siwe',
  password: process.env.NEXT_SESSION_PRIVATE_KEY || '',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
};

import { IronSessionOptions } from 'iron-session';

export const sessionOptions: IronSessionOptions = {
  cookieName: 'siwe',
  password: process.env.NEXT_SESSION_PRIVATE_KEY || '',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
};

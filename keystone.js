import dotenv from 'dotenv';
dotenv.config({ path: `.env-${process.env.NODE_ENV}` });

import { config } from '@keystone-6/core';
import { lists } from './schema';
import { withAuth, session } from './auth';

export default config(
  withAuth(
    {
      db: {
        provider: process.env.PROVIDER,
        url: process.env.DATABASE_URL,
      },
      lists,
      session,
      ui: {
        isAccessAllowed: (context) => !!context.session?.data,
      },
    }
  )

);

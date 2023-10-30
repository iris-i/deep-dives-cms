import { createAuth } from '@keystone-6/auth';
import dotenv from 'dotenv';
dotenv.config({ path: `.env-${process.env.NODE_ENV}` });

import { statelessSessions } from '@keystone-6/core/session';

const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  sessionData: 'name',
  secretField: 'password',
  initFirstItem: {
    fields: ['name', 'email', 'password'],
    // List-level access controls
    // access: { create: true, read: true, update: true, delete: true, auth: true },
  },
})

let sessionSecret = process.env.SESSION_SECRET;
let sessionMaxAge = 60 * 60 * 24 * 30; // 30 days

const session = statelessSessions({
  maxAge: sessionMaxAge,
  secret: sessionSecret,
});

export { withAuth, session }

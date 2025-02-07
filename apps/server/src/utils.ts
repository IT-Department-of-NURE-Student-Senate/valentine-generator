import { encodeBase32LowerCaseNoPadding } from '@oslojs/encoding';
import { FastifyReply } from 'fastify';

export const generateString = (): string => {
  const bytes = new Uint8Array(20);

  crypto.getRandomValues(bytes);

  const token = encodeBase32LowerCaseNoPadding(bytes);

  return token;
};

export const setSessionCookie = (reply: FastifyReply, sessionId: string) => {
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);

  if (process.env.NODE_ENV === 'production') {
    reply.header(
      'set-cookie',
      `valentine-session=${sessionId}; HttpOnly; SameSite=Lax; Expires=${expiresAt.toUTCString()}; Path=/; Secure;`,
    );
  } else {
    reply.header(
      'set-cookie',
      `valentine-session=${sessionId}; HttpOnly; SameSite=Lax; Expires=${expiresAt.toUTCString()}; Path=/`,
    );
  }
};

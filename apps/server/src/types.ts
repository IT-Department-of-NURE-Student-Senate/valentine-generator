import type http from 'node:http';
import type { FastifyInstance } from 'fastify';

type AppInstance = FastifyInstance<
  http.Server,
  http.IncomingMessage,
  http.ServerResponse
>;

interface InsertValentine {
  id: string;
  text: string;
  template: string;
  from: string;
  to: string;
}

export type { AppInstance, InsertValentine };

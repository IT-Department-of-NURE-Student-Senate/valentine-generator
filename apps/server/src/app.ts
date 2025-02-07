import fastifyCookie from '@fastify/cookie';
import { fastifyCors } from '@fastify/cors';
import fastifyRateLimit from '@fastify/rate-limit';
import { eq } from 'drizzle-orm';
import { drizzle, type PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import type { FastifyRequest } from 'fastify';
import fastify from 'fastify';
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod';
import postgres from 'postgres';
import { SESSION_COOKIE_NAME } from './constants.js';
import * as schema from './db.js';
import { env } from './env.js';
import {
  CREATE_VALENTINE_SCHEMA,
  CREATE_VALENTINE_TYPE,
  GET_VALENTINE_PARAMS_SCHEMA,
  GET_VALENTINE_PARAMS_TYPE,
} from './schemas.js';
import type { AppInstance } from './types.js';
import { generateString, setSessionCookie } from './utils.js';

export class App {
  private app: AppInstance;
  private readonly db: PostgresJsDatabase<typeof schema>;

  constructor() {
    const connection = postgres({
      username: env.POSTGRES_USER,
      password: env.POSTGRES_PASSWORD,
      host: env.POSTGRES_HOST,
      port: env.POSTGRES_PORT,
      database: env.POSTGRES_DB,
    });

    this.db = drizzle(connection, {
      schema,
      logger: true,
      casing: 'snake_case',
    });

    this.app = fastify({
      logger: {
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
          },
        },
      },
    });
  }

  private async registerPlugins(): Promise<void> {
    this.app.setValidatorCompiler(validatorCompiler);
    this.app.setSerializerCompiler(serializerCompiler);

    this.app.register(fastifyCors, {
      origin: ['http://localhost:3000'],
      credentials: true,
      methods: ['GET', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    });

    await this.app.register(fastifyCookie, {
      secret: env.COOKIE_SECRET,
      hook: 'preHandler',
    });

    await this.app.register(fastifyRateLimit, {
      max: 100,
      ban: 150,
      timeWindow: 15 * 1000,
      allowList: ['127.0.0.1'],
    });
  }

  private async registerRoutes(): Promise<void> {
    this.app.withTypeProvider<ZodTypeProvider>().register(
      (instance, opts, next) => {
        instance.route({
          method: 'GET',
          url: '/health',
          handler: (_, reply) => {
            const data = {
              uptime: process.uptime(),
              message: 'Helthy!',
              data: new Date(),
            };

            return reply.status(200).send(data);
          },
        });

        instance.route({
          method: 'POST',
          url: '/valentines',
          schema: {
            body: CREATE_VALENTINE_SCHEMA,
          },
          handler: async (
            req: FastifyRequest<{ Body: CREATE_VALENTINE_TYPE }>,
            reply,
          ) => {
            const sessionCookie = req.cookies[SESSION_COOKIE_NAME];

            const sessionId = sessionCookie ? sessionCookie : generateString();

            const data = await this.db
              .insert(schema.valentineTable)
              .values({ ...req.body, sessionId })
              .returning();

            console.log(data);

            if (!sessionCookie) {
              setSessionCookie(reply, sessionId);
            }

            return reply.status(201).send();
          },
        });

        instance.route({
          method: 'GET',
          url: '/valentines/:id',
          schema: {
            params: GET_VALENTINE_PARAMS_SCHEMA,
          },
          handler: async (
            req: FastifyRequest<{ Params: GET_VALENTINE_PARAMS_TYPE }>,
            reply,
          ) => {
            const { id } = req.params;

            const result = await this.db
              .select()
              .from(schema.valentineTable)
              .where(eq(schema.valentineTable.id, id));

            const valentine = result.at(0);

            if (!valentine) {
              return reply
                .status(404)
                .send({ status: 404, message: 'Valentine not found' });
            }

            return reply.status(200).send(valentine);
          },
        });

        instance.route({
          method: 'GET',
          url: '/valentines',
          handler: async (req, reply) => {
            const sessionId = req.cookies[SESSION_COOKIE_NAME];

            if (!sessionId) return [];

            const valentines = await this.db
              .select()
              .from(schema.valentineTable)
              .where(eq(schema.valentineTable.sessionId, sessionId));

            return reply.status(200).send(valentines);
          },
        });

        next();
      },
      { prefix: 'api' },
    );
  }

  async initialize(): Promise<AppInstance> {
    try {
      await this.registerPlugins();

      this.app.after(() => {
        this.registerRoutes();
      });

      await this.app.ready();

      return this.app;
    } catch (e: unknown) {
      this.app.log.error('Error while initializing app: ', e);
      throw e;
    }
  }
}

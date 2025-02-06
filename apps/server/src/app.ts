import fastifyCookie from '@fastify/cookie';
import { fastifyCors } from '@fastify/cors';
import fastifyRateLimit from '@fastify/rate-limit';
import { eq } from 'drizzle-orm';
import { drizzle, type PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import type { FastifyRequest } from 'fastify';
import fastify from 'fastify';
import postgres from 'postgres';
import * as schema from './db.js';
import { env } from './env.js';
import type { AppInstance, InsertValentine } from './types.js';
import { generateString, setCookie } from './utils.js';

export class App {
  private app: AppInstance;
  private readonly db: PostgresJsDatabase<typeof schema>;
  private readonly connection: postgres.Sql;

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

    this.connection = connection;

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
    this.app.register(
      (instance, opts, next) => {
        instance.get('/health', (_, reply) => {
          const data = {
            uptime: process.uptime(),
            message: 'Helthy!',
            data: new Date(),
          };

          return reply.status(200).send(data);
        });

        instance.post(
          '/valentines',
          async (req: FastifyRequest<{ Body: InsertValentine }>, reply) => {
            const sessionCookie = req.cookies['valentine-session'];

            const sessionId = sessionCookie ? sessionCookie : generateString();

            const data = await this.db
              .insert(schema.valentineTable)
              .values({ ...req.body, sessionId })
              .returning();

            console.log(data);

            if (!sessionCookie) {
              setCookie(reply, sessionId);
            }

            return reply.status(201).send();
          },
        );

        instance.get(
          '/valentines/:id',
          async (req: FastifyRequest<{ Params: { id: string } }>, reply) => {
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
        );

        instance.get('/valentines', async (req, reply) => {
          const valentines = await this.db.select().from(schema.valentineTable);

          return reply.status(200).send(valentines);
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

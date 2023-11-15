import { INestApplication } from '@nestjs/common';
import session from 'express-session';
import connectRedis from 'connect-redis';
import { Redis } from 'ioredis';
import passport from 'passport';
import crypto from 'crypto';

export function setUpSession(app: INestApplication): void {
  const RedisStore = connectRedis(session);

  const client = new Redis({
    host: process.env.REDIS_URL,
    port: parseInt(process.env.REDIS_PORT),
    password: process.env.REDIS_PASSWORD,
  });

  app.use(
    session({
      secret: crypto
        .createHash('sha512')
        .update(process.env.REDIS_SECRET)
        .digest('base64'),
      saveUninitialized: true,
      resave: false,
      store: new RedisStore({
        client: client,
        ttl: 30,
      }),
      cookie: {
        httpOnly: true,
        secure: true,
        maxAge: 30000,
      },
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());
}

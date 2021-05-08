import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import * as config from 'config';
import * as Sentry from '@sentry/node';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  const serverConfig = config.get('server');
  const logger = new Logger('Bootstrap');

  const app = await NestFactory.create(AppModule);
  app.use(
    helmet({
      contentSecurityPolicy:
        process.env.NODE_ENV === 'production' ? undefined : false,
    }),
  );
  const port = process.env.PORT || serverConfig.port;
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  logger.log(process.env.SENTRY_KEY);
  Sentry.init({
    environment: 'production',
    dsn:
      'https://b300eca0c4124c5ba196053cbf26bdcd@o629487.ingest.sentry.io/5754994',
  });
  await app.listen(port);
  logger.log(`Application listening on port ${port}`);
}
bootstrap();

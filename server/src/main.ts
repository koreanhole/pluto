import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import * as helmet from 'helmet';
import * as config from 'config';

async function bootstrap() {
  const serverConfig = config.get('server');
  const logger = new Logger('Bootstrap');

  const app = await NestFactory.create(AppModule);
  // app.use(
  //   helmet({
  //     contentSecurityPolicy:
  //       process.env.NODE_ENV === 'production' ? undefined : false,
  //   }),
  // );
  // app.enableCors();
  const port = process.env.PORT || serverConfig.port;
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port);
  logger.log(`Application listening on port ${port}`);
}
bootstrap();

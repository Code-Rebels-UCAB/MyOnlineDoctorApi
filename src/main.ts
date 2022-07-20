import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './commun/infraestructura/excepciones/Excepcion.middleware';
import { LoggerService } from './commun/infraestructura/logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalFilters(new AllExceptionFilter(new LoggerService()));
  await app.listen(3000);
}
bootstrap();

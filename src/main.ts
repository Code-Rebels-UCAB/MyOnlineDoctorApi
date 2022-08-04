import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './commun/infraestructura/excepciones/Excepcion.middleware';
import { LoggingInterceptor } from './commun/infraestructura/logger/logger.interceptor';
import { LoggerService } from './commun/infraestructura/logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalFilters(new AllExceptionFilter(new LoggerService()));
  app.useGlobalInterceptors(new LoggingInterceptor(new LoggerService()));
  await app.listen(parseInt(process.env.PORT) || 3000);
}
bootstrap();

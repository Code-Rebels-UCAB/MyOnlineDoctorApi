import { LoggerService } from '../../src/commun/infraestructura/logger/logger.service';

jest.mock('../../src/commun/infraestructura/logger/logger.service');

export class LoggerMockFactory {
  static Crear() {
    return new LoggerService();
  }
}

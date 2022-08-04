import { ManejadorEventos } from '../../src/commun/aplicacion/ManejadorEventos';

jest.mock('../../src/commun/aplicacion/ManejadorEventos');

export class ManejadorEventosMockFactory {
  static Crear() {
    return new ManejadorEventos();
  }
}

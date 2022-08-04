import { LoggerMockFactory } from '../../fabricas/LoggerMockFactory';
import { CitaRepoMockFactory } from '../../fabricas/CitaRepoMockFactory';
import { CancelarCita } from '../../../src/cita/aplicacion/servicios/CancelarCita.service';


describe('Unitario - CU Cancelar Cita', () => {
  let mockRepositorioCita;
  let mockLoggerService;
  let casoUso: CancelarCita;

  beforeAll(() => {
    mockRepositorioCita = CitaRepoMockFactory.Crear();
    mockLoggerService = LoggerMockFactory.Crear();
    casoUso = new CancelarCita(mockLoggerService, mockRepositorioCita);
  });

  it('Debe retornar una cita cancelada', async () => {
    const resultado = casoUso.ejecutar('4f23f91c-7782-4f0a-b1c3-603bff9b8072');

    return resultado.then((res) => {
      expect(res.esExitoso).toBeTruthy();
      expect(res.valor.idCita).toBe("4f23f91c-7782-4f0a-b1c3-603bff9b8072");
      expect(res.valor.status).toBe("Cancelada");
    });
  });

  it('Debe retornar un Error -> No existe la cita', async () => {
    const resultado = casoUso.ejecutar('1');

    return resultado.then((res) => {
      expect(res.esExitoso).toBeFalsy();

    });
  });

});
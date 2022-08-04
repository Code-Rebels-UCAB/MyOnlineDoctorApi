import { LoggerMockFactory } from '../../fabricas/LoggerMockFactory';
import { CitaRepoMockFactory } from '../../fabricas/CitaRepoMockFactory';
import { FinalizarCita} from '../../../src/cita/aplicacion/servicios/FinalizarCita.service';


describe('Unitario - CU Finalizar Cita', () => {
  let mockRepositorioCita;
  let mockLoggerService;
  let casoUso: FinalizarCita;

  beforeAll(() => {
    mockRepositorioCita = CitaRepoMockFactory.Crear();
    mockLoggerService = LoggerMockFactory.Crear();
    casoUso = new FinalizarCita(mockLoggerService, mockRepositorioCita);
  });

  it('Debe retornar una cita finalizada', async () => {
    const resultado = casoUso.ejecutar('4f23f91c-7782-4f0a-b1c3-603bff9b8072');

    return resultado.then((res) => {
      expect(res.esExitoso).toBeTruthy();
      expect(res.valor.idCita).toBe("4f23f91c-7782-4f0a-b1c3-603bff9b8072");
      expect(res.valor.status).toBe("Finalizada");
    });
  });

  it('Debe retornar un Error -> No existe la cita', async () => {
    const resultado = casoUso.ejecutar('1');

    return resultado.then((res) => {
      expect(res.esExitoso).toBeFalsy();

    });
  });

});

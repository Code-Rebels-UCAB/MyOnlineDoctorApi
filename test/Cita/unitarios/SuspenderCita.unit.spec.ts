import { LoggerMockFactory } from '../../fabricas/LoggerMockFactory';
import { CitaRepoMockFactory } from '../../fabricas/CitaRepoMockFactory';
import { SuspenderCita } from '../../../src/cita/aplicacion/servicios/SuspenderCita.service';
import { ManejadorEventosMockFactory } from '../../fabricas/ManejadorEventosMockFactory';


describe('Unitario - CU Solicitar Cita', () => {
  let mockRepositorioCita;
  let mockLoggerService;
  let mockManejadorEventos;
  let casoUso: SuspenderCita;

  beforeAll(() => {
    mockRepositorioCita = CitaRepoMockFactory.Crear();
    mockLoggerService = LoggerMockFactory.Crear();
    mockManejadorEventos = ManejadorEventosMockFactory.Crear();
    casoUso = new SuspenderCita(mockLoggerService, mockRepositorioCita, mockManejadorEventos);
  });

    it('Debe retornar una cita suspendida', async () => {
        const resultado = casoUso.ejecutar('4f23f91c-7782-4f0a-b1c3-603bff9b8072');
    
        return resultado.then((res) => {
          expect(res.esExitoso).toBeTruthy();
          expect(res.valor.idCita).toBe("4f23f91c-7782-4f0a-b1c3-603bff9b8072");
          expect(res.valor.status).toBe("Suspendida");
        });
    });

    it('Debe retornar un Error -> No existe la cita', async () => {
        const resultado = casoUso.ejecutar('1');
    
        return resultado.then((res) => {
          expect(res.esExitoso).toBeFalsy();

        });
    });



});

import { LoggerMockFactory } from '../../fabricas/LoggerMockFactory';
import { CitaRepoMockFactory } from '../../fabricas/CitaRepoMockFactory';
import { AceptarCita } from '../../../src/cita/aplicacion/servicios/AceptarCita.service';
import { ManejadorEventosMockFactory } from '../../fabricas/ManejadorEventosMockFactory';


describe('Unitario - CU Aceptar Cita', () => {
  let mockRepositorioCita;
  let mockLoggerService;
  let mockManejadorEventos;
  let casoUso: AceptarCita;

  beforeAll(() => {
    mockRepositorioCita = CitaRepoMockFactory.Crear();
    mockLoggerService = LoggerMockFactory.Crear();
    mockManejadorEventos = ManejadorEventosMockFactory.Crear();
    casoUso = new AceptarCita(mockLoggerService, mockRepositorioCita);
  });

    it('Debe retornar una cita aceptada', async () => {
        const resultado = casoUso.ejecutar('4f23f91c-7782-4f0a-b1c3-603bff9b8072');
    
        return resultado.then((res) => {
          expect(res.esExitoso).toBeTruthy();
          expect(res.valor.idCita).toBe("4f23f91c-7782-4f0a-b1c3-603bff9b8072");
          expect(res.valor.status).toBe("Aceptada");
        });
    });

    it('Debe retornar un Error -> No existe la cita', async () => {
        const resultado = casoUso.ejecutar('1');
    
        return resultado.then((res) => {
          expect(res.esExitoso).toBeFalsy();

        });
    });



});
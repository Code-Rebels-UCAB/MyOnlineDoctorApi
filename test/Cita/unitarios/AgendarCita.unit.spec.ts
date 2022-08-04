import { LoggerMockFactory } from '../../fabricas/LoggerMockFactory';
import { CitaRepoMockFactory } from '../../fabricas/CitaRepoMockFactory';
import { AgendarCita } from '../../../src/cita/aplicacion/servicios/AgendarCita.service';
import { ManejadorEventosMockFactory } from '../../fabricas/ManejadorEventosMockFactory';


describe('Unitario - CU Agendar Cita', () => {
  let mockRepositorioCita;
  let mockLoggerService;
  let mockManejadorEventos;
  let casoUso: AgendarCita;

  beforeAll(() => {
    mockRepositorioCita = CitaRepoMockFactory.Crear();
    mockLoggerService = LoggerMockFactory.Crear();
    mockManejadorEventos = ManejadorEventosMockFactory.Crear();
    casoUso = new AgendarCita(mockLoggerService, mockRepositorioCita, mockManejadorEventos);
  });

  it('Debe agendar la cita pautada con el paciente', () => {
    const resultado = casoUso.ejecutar({
        idCita: "a42253d2-69bd-4136-8ee4-62ce9f84ea31",
        fechaCita: "2022-08-11",
        horaCita: "10:00:00",
        duracion: "60",
    });

    return resultado.then((res) => {
      expect(res.esExitoso).toBeTruthy();
    });
  });

  it('Una cita que no existe, no se puede agendar', () => {
    const resultado = casoUso.ejecutar({
        fechaCita: "2022-08-11",
        horaCita: "10:00:00",
        duracion: "60",
    });

    return resultado.then((res) => {
      expect(res.esExitoso).toBeFalsy();
    });
  });



});

import { BuscarCantidadTodosLosPacientes } from '../../../src/paciente/aplicacion/servicios/BuscarCantidadPacientesSistema.service';
import { CantidadCitasDiaDoctor } from '../../../src/cita/aplicacion/servicios/CantidadCitasDiaDoctor.service';
import { LoggerMockFactory } from '../../fabricas/LoggerMockFactory';
import { PacienteRepoMockFactory } from '../../fabricas/PacienteRepoMockFactory';
import { CitaRepoMockFactory } from '../../fabricas/CitaRepoMockFactory';

describe('Unitario - CU Cantidad Pacientes del Sistema, Cantidad de Citas del Dia de Doctor, Cantidad de Pacientes de Doctor', () => {
  let mockLoggerService;
  let mockRepositorioPaciente;
  let mockRepositorioCita;
  let casoPruebaTodosPacientes: BuscarCantidadTodosLosPacientes;
  let casoPruebaCantidadCitasDia: CantidadCitasDiaDoctor;

  beforeAll(() => {
    mockLoggerService = LoggerMockFactory.Crear();
    mockRepositorioPaciente = PacienteRepoMockFactory.Crear();
    mockRepositorioCita = CitaRepoMockFactory.Crear();
    casoPruebaTodosPacientes = new BuscarCantidadTodosLosPacientes(
      mockLoggerService,
      mockRepositorioPaciente,
    );
    casoPruebaCantidadCitasDia = new CantidadCitasDiaDoctor(
      mockLoggerService,
      mockRepositorioCita,
    );
  });

  it('Debe devolver la Cantidad de Pacientes Registrados en el Sistema', () => {
    const resultado = casoPruebaTodosPacientes.ejecutar();

    return resultado.then((result) => {
      expect(result.esExitoso).toBeTruthy();
      expect(result.valor).toBe(3);
    });
  });

  it('Debe devolver la Cantidad de Citas del Dia del Doctor', () => {
    const resultado = casoPruebaCantidadCitasDia.ejecutar(
      '0c8aa290-d11c-4d47-8e38-6606a03f434a',
    );

    return resultado.then((result) => {
      expect(result.esExitoso).toBeTruthy();
      expect(result.valor).toBe(1);
    });
  });
});

import { BuscarCantidadTodosLosPacientes } from '../../../src/paciente/aplicacion/servicios/BuscarCantidadPacientesSistema.service';
import { LoggerMockFactory } from '../../fabricas/LoggerMockFactory';
import { PacienteRepoMockFactory } from '../../fabricas/PacienteRepoMockFactory';

describe('Unitario - CU Cantidad Pacientes del Sistema, Cantidad de Citas del Dia de Doctor, Cantidad de Pacientes de Doctor', () => {
  let mockLoggerService;
  let mockRepositorioPaciente;
  let mockRepositorioCita;
  let casoUso: BuscarCantidadTodosLosPacientes;

  beforeAll(() => {
    mockLoggerService = LoggerMockFactory.Crear();
    mockRepositorioPaciente = PacienteRepoMockFactory.Crear();
    // mockRepositorioCita = CitaRepoMockFactory.Crear();
    casoUso = new BuscarCantidadTodosLosPacientes(
      mockLoggerService,
      mockRepositorioPaciente,
    );
  });

  it('Debe devolver Cantidad de Pacientes Registrados en el Sistema', () => {
    const resultado = casoUso.ejecutar();

    return resultado.then((result) => {
      expect(result.esExitoso).toBeTruthy();
      expect(result.valor).toBe(3);
    });
  });
});

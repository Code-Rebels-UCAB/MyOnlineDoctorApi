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
  });
});

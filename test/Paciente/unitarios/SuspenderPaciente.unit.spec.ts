import { PacienteRepoMockFactory } from '../../../test/fabricas/PacienteRepoMockFactory';
import { LoggerMockFactory } from '../../fabricas/LoggerMockFactory';
import { ManejadorEventosMockFactory } from '../../fabricas/ManejadorEventosMockFactory';
import { SuspenderPaciente } from '../../../src/paciente/aplicacion/servicios/SuspenderPaciente.service';

describe('Unitario - CU Suspender Paciente', () => {
  let mockLogger;
  let mockRepositorioPaciente;
  let mockManager;
  let casoUso: SuspenderPaciente;

  beforeAll(() => {
    mockLogger = LoggerMockFactory.Crear();
    mockRepositorioPaciente = PacienteRepoMockFactory.Crear();
    mockManager = ManejadorEventosMockFactory.Crear();
    casoUso = new SuspenderPaciente(
      mockLogger,
      mockRepositorioPaciente,
      mockManager,
    );
  });

  it('Debe cambiar status del Paciente a Suspendido', () => {
    const resultado = casoUso.ejecutar('56ba95ea-accc-458d-962f-b88edab62ba8');

    return resultado.then((result) => {
      expect(result.esExitoso).toBeTruthy();
    });
  });

  it('Si el ID de paciente no existe, debe devolver error', () => {
    const resultado = casoUso.ejecutar('4a2ed3f9-5331-41a7-89e1-c8d1f76d23e7');

    return resultado.then((result) => {
      expect(result.esExitoso).toBeFalsy();
    });
  });
});

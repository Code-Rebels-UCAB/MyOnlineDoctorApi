import { PacienteRepoMockFactory } from '../../../test/fabricas/PacienteRepoMockFactory';
import { LoggerMockFactory } from '../../fabricas/LoggerMockFactory';
import { ManejadorEventosMockFactory } from '../../fabricas/ManejadorEventosMockFactory';
import { BloquearPaciente } from '../../../src/paciente/aplicacion/servicios/BloquearPaciente.service';

describe('Unitario - CU Bloquear Paciente', () => {
  let mockLogger;
  let mockRepositorioPaciente;
  let mockManager;
  let casoUso: BloquearPaciente;

  beforeAll(() => {
    mockLogger = LoggerMockFactory.Crear();
    mockRepositorioPaciente = PacienteRepoMockFactory.Crear();
    mockManager = ManejadorEventosMockFactory.Crear();
    casoUso = new BloquearPaciente(
      mockLogger,
      mockRepositorioPaciente,
      mockManager,
    );
  });

  it('Debe cambiar status del Paciente a Bloqueado', () => {
    const resultado = casoUso.ejecutar('ed649257-8091-4b77-827a-8532b5c4c826');

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

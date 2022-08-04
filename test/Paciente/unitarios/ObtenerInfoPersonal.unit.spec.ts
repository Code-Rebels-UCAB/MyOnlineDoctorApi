import { LoggerMockFactory } from '../../fabricas/LoggerMockFactory';
import { ObtenerInfoPersonalPaciente } from '../../../src/paciente/aplicacion/servicios/ObtenerInfoPersonalPaciente.service';
import { PacienteRepoMockFactory } from '../../../test/fabricas/PacienteRepoMockFactory';


describe('Unitario - CU Obtener Info Personal Paciente', () => {
  let mockRepositorioPaciente;
  let mockLoggerService;
  let casoUso: ObtenerInfoPersonalPaciente;

  beforeAll(() => {
    mockRepositorioPaciente = PacienteRepoMockFactory.Crear();
    mockLoggerService = LoggerMockFactory.Crear();
    casoUso = new ObtenerInfoPersonalPaciente(mockLoggerService, mockRepositorioPaciente);
  });

  it('Debe devolver la informacion personal del paciente', () => {
    const resultado = casoUso.ejecutar('56ba95ea-accc-458d-962f-b88edab62ba8');

    return resultado.then((res) => {
      expect(res.esExitoso).toBeTruthy();
      expect(res.valor.p_nombre).toBe('Carlos');
    });
  });

  it('Un Paciente que no existe, debe devolver error', () => {
    const resultado = casoUso.ejecutar('12asf');

    return resultado.then((res) => {
      expect(res.esExitoso).toBeFalsy();
    });
  });

});
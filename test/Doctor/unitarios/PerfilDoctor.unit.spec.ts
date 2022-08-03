import { LoggerMockFactory } from '../../fabricas/LoggerMockFactory';
import { BuscarDatosPerfil } from '../../../src/doctor/aplicacion/servicios/BuscarDatosPerfil.service';
import { DoctorRepoMockFactory } from '../../fabricas/DoctorRepoMockFactory';

describe('Unitario - CU Buscar Perfil de Doctor', () => {
  let mockRepositorioDoctor;
  let mockLoggerService;
  let casoUso: BuscarDatosPerfil;

  beforeAll(() => {
    mockRepositorioDoctor = DoctorRepoMockFactory.Crear();
    mockLoggerService = LoggerMockFactory.Crear();
    casoUso = new BuscarDatosPerfil(mockLoggerService, mockRepositorioDoctor);
  });

  it('Debe devolver los datos del perfil del doctor', () => {
    const resultado = casoUso.ejecutar('0462d106-df70-4f8d-b322-0c736f4069e7');

    return resultado.then((res) => {
      expect(res.esExitoso).toBeTruthy();
      expect(res.valor.nombre).toBe('Aaron Glassman');
    });
  });

  it('Un doctor que no existe, no debe devolver los datos del perfil del doctor', () => {
    const resultado = casoUso.ejecutar('0c8aa290-d11c-4d47-8e38-6606a03f434a');

    return resultado.then((res) => {
      expect(res.esExitoso).toBeFalsy();
      expect(res.valor).toBe(null);
    });
  });
});

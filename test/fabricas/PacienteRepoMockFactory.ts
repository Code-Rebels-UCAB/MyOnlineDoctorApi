import { PacienteORM } from '../../src/paciente/infraestructura/persistencia/Paciente.orm';
import { RepositorioPaciente } from '../../src/paciente/infraestructura/adaptadores/RepositorioPaciente';
import { Data } from '../../src/commun/infraestructura/database/database.service';

jest.mock(
  '../../src/paciente/infraestructura/adaptadores/RepositorioPaciente.ts',
);

export class PacienteRepoMockFactory {
  static Crear() {
    return new RepositorioPaciente(Data.getRepository(PacienteORM));
  }
}

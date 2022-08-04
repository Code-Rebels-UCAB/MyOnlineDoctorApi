import { CitaORM } from '../../src/cita/infraestructura/persistencia/Cita.orm';
import { DoctorORM } from '../../src/doctor/infraestructura/persistencia/Doctor.orm';
import { PacienteORM } from '../../src/paciente/infraestructura/persistencia/Paciente.orm';
import { RepositorioCita } from '../../src/cita/infraestructura/adaptadores/RepositorioCita';
import { Data } from '../../src/commun/infraestructura/database/database.service';

jest.mock('../../src/cita/infraestructura/adaptadores/RepositorioCita');

export class CitaRepoMockFactory {
  static Crear() {
    return new RepositorioCita(
      Data.getRepository(CitaORM),
      Data.getRepository(DoctorORM),
      Data.getRepository(PacienteORM),
    );
  }
}

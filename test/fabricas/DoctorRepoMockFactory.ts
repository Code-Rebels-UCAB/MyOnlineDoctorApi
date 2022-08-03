import { JwtService } from '@nestjs/jwt';
import { DoctorORM } from '../../src/doctor/infraestructura/persistencia/Doctor.orm';
import { RepositorioDoctor } from '../../src/doctor/infraestructura/adaptadores/RepositorioDoctor';
import { Data } from '../../src/commun/infraestructura/database/database.service';

jest.mock('../../src/doctor/infraestructura/adaptadores/RepositorioDoctor');

export class DoctorRepoMockFactory {
  static Crear() {
    return new RepositorioDoctor(
      Data.getRepository(DoctorORM),
      new JwtService(),
    );
  }
}

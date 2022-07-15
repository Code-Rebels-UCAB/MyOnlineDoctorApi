import { IValueObject } from '../../../commun/dominio/values/IValueObject';
import { Status } from './Status';
import { StatusDoctorVacio } from '../excepciones/statusDoctorVacio';


export class StatusDoctor implements IValueObject {
  private constructor(private readonly status: Status) {}

  public getStatus(): Status {
    return this.status;
  }

  public esIgual(status: StatusDoctor): boolean {
    return this.status == status.getStatus();
  }

  public static crear(status: Status) {
    if (status == null || status == undefined) {
      throw new StatusDoctorVacio(
        'El Status del Doctor no puede estar vacio',
      );
    }
    return new StatusDoctor(status);
  }
}

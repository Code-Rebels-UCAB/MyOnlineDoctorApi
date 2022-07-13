import { IValueObject } from '../../../commun/dominio/values/IValueObject';
import { Status } from './Status';

export class StatusSuscripcion implements IValueObject {
  private constructor(private readonly status: Status) {}

  public getStatusSuscripcion(): Status {
    return this.status;
  }

  public esIgual(status: StatusSuscripcion): boolean {
    return this.status == status.getStatusSuscripcion();
  }

  public static crear(status: Status) {
    return new StatusSuscripcion(status);
  }
}

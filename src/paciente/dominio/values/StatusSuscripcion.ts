import { IValueObject } from 'src/commun/dominio/values/IValueObject';
import { Status } from '../Status';

export class StatusSuscripcion implements IValueObject {
  constructor(private readonly status: Status) {}

  public getStatusSuscripcion(): Status {
    return this.status;
  }

  public esIgual(status: StatusSuscripcion): boolean {
    return this.status == status.getStatusSuscripcion();
  }
}

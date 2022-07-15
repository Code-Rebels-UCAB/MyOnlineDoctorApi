import { IValueObject } from '../../../commun/dominio/values/IValueObject';
import { Status } from './Status';


export class StatusDoctor implements IValueObject {
  private constructor(private readonly status: Status) {}

  public getStatus(): Status {
    return this.status;
  }

  public esIgual(status: StatusDoctor): boolean {
    return this.status == status.getStatus();
  }

  public static crear(status: Status) {

    return new StatusDoctor(status);
  }
}

import { IValueObject } from '../../../commun/dominio/values/IValueObject';
import { StatusSuscripcionVacio } from '../excepciones/StatusSuscripcionVacio';
import { StatusPaciente } from './StatusPaciente';

export class StatusSuscripcion implements IValueObject {
  private constructor(private readonly status: StatusPaciente) {}

  public getStatusSuscripcion(): StatusPaciente {
    return this.status;
  }

  public esIgual(status: StatusSuscripcion): boolean {
    return this.status == status.getStatusSuscripcion();
  }

  public static crear(status: StatusPaciente) {
    if (status == null || status == undefined) {
      throw new StatusSuscripcionVacio(
        'El Status de la Suscripcion no puede estar vacio',
      );
    }

    return new StatusSuscripcion(status);
  }
}

import { IValueObject } from 'src/commun/dominio/values/IValueObject';

export class FechaDeNacimiento implements IValueObject {
  constructor(private readonly fecha: Date) {}

  public getFechaNacimiento(): Date {
    return this.fecha;
  }

  public esIgual(fecha: FechaDeNacimiento): boolean {
    return this.fecha == fecha.getFechaNacimiento();
  }
}

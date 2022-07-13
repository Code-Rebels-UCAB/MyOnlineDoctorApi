import { IValueObject } from '../../../commun/dominio/values/IValueObject';

export class CorreoPaciente implements IValueObject {
  constructor(private readonly correo: string) {}

  public getCorreoPaciente(): string {
    return this.correo;
  }

  public esIgual(correo: CorreoPaciente): boolean {
    return this.correo == correo.getCorreoPaciente();
  }
}

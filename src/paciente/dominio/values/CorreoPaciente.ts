import { IValueObject } from '../../../commun/dominio/values/IValueObject';
import { Alergia } from './Alergia';

export class CorreoPaciente implements IValueObject {
  private constructor(private readonly correo: string) {}

  public getCorreoPaciente(): string {
    return this.correo;
  }

  public esIgual(correo: CorreoPaciente): boolean {
    return this.correo == correo.getCorreoPaciente();
  }

  public static crear(correo: string) {
    return new CorreoPaciente(correo);
  }
}

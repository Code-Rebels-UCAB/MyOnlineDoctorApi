import { IValueObject } from '../../../commun/dominio/values/IValueObject';
import { CorreoInvalido } from '../excepciones/CorreoInvalido';
import { CorreoVacio } from '../excepciones/CorreoVacio';

export class CorreoPaciente implements IValueObject {
  private constructor(private readonly correo: string) {}

  public getCorreoPaciente(): string {
    return this.correo;
  }

  public esIgual(correo: CorreoPaciente): boolean {
    return this.correo == correo.getCorreoPaciente();
  }

  public static crear(correo: string) {
    if (correo == null || correo == '' || correo == undefined) {
      throw new CorreoVacio('El Correo del Paciente no puede estar vacio');
    } else if (!correo.includes('@')) {
      throw new CorreoInvalido('El Correo ingresado no es valido');
    }

    return new CorreoPaciente(correo);
  }
}

import { IValueObject } from 'interfaceVO';
import { CorreoInvalidoDoctor } from '../excepciones/CorreoInvalidoDoctor';
import { CorreoVacioDoctor } from '../excepciones/CorreoVacioDoctor';

export class CorreoDoctor implements IValueObject {
  private constructor(private readonly correo: string) {}

  public getCorreoDoctor() {
    return this.correo;
  }

  public esIgual(correoDoctor: CorreoDoctor): boolean {
    return this.correo == correoDoctor.getCorreoDoctor();
  }

  public static crear(correo: string) {
    if (correo == null || correo == '' || correo == undefined) {
      throw new CorreoVacioDoctor('El Correo del Doctor no puede estar vacio');
    } else if (!correo.includes('@')) {
      throw new CorreoInvalidoDoctor('El Correo ingresado no es valido');
    }

    return new CorreoDoctor(correo);
  }
}

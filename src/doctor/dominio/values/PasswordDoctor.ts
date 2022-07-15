import { IValueObject } from 'interfaceVO';
import { PasswordInvalidoDoctor } from '../excepciones/PasswordInvalidoDoctor';
import { PasswordVacioDoctor } from '../excepciones/PasswordVacioDoctor';

export class PasswordDoctor implements IValueObject {
  private constructor(private readonly password: string) {}

  public getPasswordDoctor() {
    return this.password;
  }

  public esIgual(passwordDoctor: PasswordDoctor): boolean {
    return this.password == passwordDoctor.getPasswordDoctor();
  }

  public static crear(password: string) {
    if (password == '' || password == null || password == undefined) {
      throw new PasswordVacioDoctor(
        'La Contraseña del Paciente no puede estar vacia',
      );
    } else if (
      password.length < 8 ||
      !/\d/.test(password) ||
      !/[A-Z]/.test(password) //Valida si la password tiene al menos un numero, una mayuscula y 8 o mas caracteres
    ) {
      throw new PasswordInvalidoDoctor('La Contraseña no es valida');
    }

    return new PasswordDoctor(password);
  }
  
}

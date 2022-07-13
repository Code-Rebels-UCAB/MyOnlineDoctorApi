import { IValueObject } from '../../../commun/dominio/values/IValueObject';
import { PasswordInvalido } from '../excepciones/PasswordInvalido';
import { PasswordVacio } from '../excepciones/PasswordVacio';

export class PasswordPaciente implements IValueObject {
  private constructor(private readonly password: string) {}

  public getPasswordPaciente(): string {
    return this.password;
  }

  public esIgual(password: PasswordPaciente): boolean {
    return this.password == password.getPasswordPaciente();
  }

  public static crear(password: string) {
    if (password == '' || password == null || password == undefined) {
      throw new PasswordVacio(
        'La Contraseña del Paciente no puede estar vacia',
      );
    } else if (
      password.length < 8 ||
      !/\d/.test(password) ||
      !/[A-Z]/.test(password) //Valida si la password tiene al menos un numero, una mayuscula y 8 o mas caracteres
    ) {
      throw new PasswordInvalido('La Contraseña no es valida');
    }

    return new PasswordPaciente(password);
  }
}

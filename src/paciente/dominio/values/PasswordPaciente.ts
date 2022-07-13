import { IValueObject } from '../../../commun/dominio/values/IValueObject';

export class PasswordPaciente implements IValueObject {
  private constructor(private readonly password: string) {}

  public getPasswordPaciente(): string {
    return this.password;
  }

  public esIgual(password: PasswordPaciente): boolean {
    return this.password == password.getPasswordPaciente();
  }

  public static crear(password: string) {
    return new PasswordPaciente(password);
  }
}

import { IValueObject } from 'src/commun/dominio/values/IValueObject';

export class PasswordPaciente implements IValueObject {
  constructor(private readonly password: string) {}

  public getPasswordPaciente(): string {
    return this.password;
  }

  public esIgual(password: PasswordPaciente): boolean {
    return this.password == password.getPasswordPaciente();
  }
}

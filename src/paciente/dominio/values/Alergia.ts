import { IValueObject } from 'src/commun/dominio/values/IValueObject';

export class Alergia implements IValueObject {
  constructor(private readonly alergia: string) {}

  public getAlergia(): string {
    return this.alergia;
  }

  public esIgual(alergia: Alergia): boolean {
    return this.alergia == alergia.getAlergia();
  }
}

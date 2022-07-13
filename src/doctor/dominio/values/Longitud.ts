import { IValueObject } from 'interfaceVO';

export class Longitud implements IValueObject {
  private constructor(private readonly valor: number) {}

  public getLogitud() {
    return this.valor;
  }

  public esIgual(longitud: Longitud): boolean {
    return this.valor == longitud.getLogitud();
  }
}

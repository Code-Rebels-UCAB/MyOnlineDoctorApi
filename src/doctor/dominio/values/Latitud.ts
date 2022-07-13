import { IValueObject } from 'interfaceVO';

export class Latitud implements IValueObject {
  private constructor(private readonly valor: number) {}

  public getLatitud() {
    return this.valor;
  }

  public esIgual(latitud: Latitud): boolean {
    return this.valor == latitud.getLatitud();
  }
}

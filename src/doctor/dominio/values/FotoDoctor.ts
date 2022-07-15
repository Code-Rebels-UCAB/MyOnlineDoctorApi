import { IValueObject } from 'interfaceVO';

export class FotoDoctor implements IValueObject {
  private constructor(private readonly valor: string) {}

  public getFoto() {
    return this.valor;
  }

  public esIgual(fotoDoctor: FotoDoctor): boolean {
    return this.valor == fotoDoctor.getFoto();
  }
}

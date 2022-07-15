import { IValueObject } from 'interfaceVO';
import { FotoVacio } from '../excepciones/FotoVacio';

export class FotoDoctor implements IValueObject {
  private constructor(private readonly valor: string) {}

  public getFoto() {
    return this.valor;
  }

  public esIgual(fotoDoctor: FotoDoctor): boolean {
    return this.valor == fotoDoctor.getFoto();
  }

  public static crear(valor: string) {
    if (valor == null || valor == undefined) {
      throw new FotoVacio('La Foto del Doctor no puede estar vacio');
    }

    return new FotoDoctor(valor);
  }
}

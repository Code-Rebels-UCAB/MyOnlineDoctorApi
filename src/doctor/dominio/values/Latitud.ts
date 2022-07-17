import { IValueObject } from 'interfaceVO';
import { LatitudInvalido } from '../excepciones/LatitudInvalido';
import { LatitudVacio } from '../excepciones/LatitudVacio';

export class Latitud implements IValueObject {
  private constructor(private readonly valor: string) {}

  public getLatitud() {
    return this.valor;
  }

  public esIgual(latitud: Latitud): boolean {
    return this.valor == latitud.getLatitud();
  }

  public static crear(valor: string) {
    if (valor == null || valor == undefined) {
      throw new LatitudVacio('La latitud no puede estar vacio');
    } else if (Math.abs(Number(valor)) > 90) {
      throw new LatitudInvalido('La latitud no es valida');
    }

    return new Latitud(valor);
  }
}

import { IValueObject } from 'interfaceVO';
import { LongitudInvalido } from '../excepciones/LongitudInvalido';
import { LongitudVacio } from '../excepciones/LongitudVacio';

export class Longitud implements IValueObject {
  private constructor(private readonly valor: string) {}

  public getLogitud() {
    return this.valor;
  }

  public esIgual(longitud: Longitud): boolean {
    return this.valor == longitud.getLogitud();
  }

  public static crear(valor: string) {
    if (valor == null || valor == undefined) {
      throw new LongitudVacio('La longitud no puede estar vacio');
    } else if ( Math.abs(Number(valor)) > 180) {
      throw new LongitudInvalido('La longitud no es valida');
    }

    return new Longitud(valor);
  }
}

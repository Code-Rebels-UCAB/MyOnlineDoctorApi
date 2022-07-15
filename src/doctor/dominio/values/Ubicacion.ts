import { IValueObject } from 'interfaceVO';
import { Longitud } from './Longitud';
import { Latitud } from './Latitud';
import { LatitudVacio } from '../excepciones/LatitudVacio';
import { LongitudVacio } from '../excepciones/LongitudVacio';

export class Ubicacion implements IValueObject {
  private constructor(private latitud: Latitud, private longitud: Longitud) {}

  public getLongitud() {
    return this.longitud;
  }

  public getLatitud() {
    return this.latitud;
  }

  public esIgual(ubicacion: Ubicacion): boolean {
    return (
      this.longitud == ubicacion.getLongitud() &&
      this.latitud == ubicacion.getLatitud()
    );
  }

  public static crear(latitud: Latitud, longitud: Longitud) {
    if (latitud == null || latitud == undefined) {
      throw new LatitudVacio('La latitud no puede estar vacio');
    } else if (longitud == null || longitud == undefined) {
      throw new LongitudVacio('La longitud no puede estar vacia');
    }

    return new Ubicacion(latitud, longitud);
  }
}

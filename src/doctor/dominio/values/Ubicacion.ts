import { IValueObject } from 'interfaceVO';
import { Longitud } from './Longitud';
import { Latitud } from './Latitud';

export class Ubicacion implements IValueObject {
  private constructor(private longitud: Longitud, private latitud: Latitud) {}

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
}

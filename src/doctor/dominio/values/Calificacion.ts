import { IValueObject } from 'interfaceVO';
import { CalificacionInvalida } from '../excepciones/CalificacionInvalida';
import { CalificacionVacia } from '../excepciones/CalificacionVacia';

export class Calificacion implements IValueObject {
  private constructor(private readonly puntaje: number) {}

  public getCalificacion() {
    return this.puntaje;
  }

  public esIgual(calificacion: Calificacion): boolean {
    return this.puntaje == calificacion.getCalificacion();
  }

  public static crear(puntaje: number) {
    if (puntaje == null || puntaje == undefined) {
      throw new CalificacionVacia(
        'La calificacción del Doctor del doctor no puede ser vacia',
      );
    } else if (Number(puntaje) < 0 || Number(puntaje) > 5) {
      throw new CalificacionInvalida(
        'La calificación debe ser un número entre el 0 y 5',
      );
    }

    return new Calificacion(puntaje);
  }
}

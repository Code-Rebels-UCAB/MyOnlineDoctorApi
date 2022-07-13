import { IValueObject } from 'interfaceVO';

export class Calificacion implements IValueObject {
  private constructor(private readonly puntaje: number) {}

  public getCalificacion() {
    return this.puntaje;
  }

  public esIgual(calificacion: Calificacion): boolean {
    return this.puntaje == calificacion.getCalificacion();
  }
}

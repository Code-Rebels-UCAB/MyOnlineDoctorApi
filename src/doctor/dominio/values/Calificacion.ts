import { IValueObject } from 'interfaceVO';
import { CalificacionInvalida } from '../excepciones/CalificacionInvalida';
import { CalificacionVacia } from '../excepciones/CalificacionVacia';

export class Calificacion implements IValueObject {
  private constructor(private puntaje: number, private cantidad: number) {}

  public getCalificacion() {
    return this.puntaje;
  }

  public getCantidad() {
    return this.cantidad;
  }

  public esIgual(calificacion: Calificacion): boolean {
    return this.puntaje == calificacion.getCalificacion();
  }

  public static crear(puntaje: number, cantidad: number) {
    if (puntaje == null || puntaje == undefined) {
      throw new CalificacionVacia(
        'La calificacción del Doctor del doctor no puede ser vacia',
      );
    } 
    else if (Number(puntaje) < 0) {
      throw new CalificacionInvalida(
        'La calificación no debe ser menor a 0',
      );
    }

    return new Calificacion(puntaje, cantidad);
  }

  public calcularCalificacion(): number{
    if(this.cantidad == 0 ){
      return 0;
    }
    else{
      return Number((this.puntaje / this.cantidad).toFixed(2));
    }
  }

  public static agregarCalificacion(calificacionDoctor:Calificacion, nuevaCalificacion: Calificacion): Calificacion{

    return new Calificacion(Number(calificacionDoctor.getCalificacion()) + Number(nuevaCalificacion.getCalificacion()), Number(calificacionDoctor.cantidad) + 1);

  }

}

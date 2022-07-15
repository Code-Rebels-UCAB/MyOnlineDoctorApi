import { IValueObject } from 'interfaceVO';
import { EspecialidadVacia } from '../excepciones/EspecialidadVacia';

export class Especialidad implements IValueObject {
  private constructor(private readonly especialidad: string) {}

  public getEspecialidad() {
    return this.especialidad;
  }

  public esIgual(especialidad: Especialidad): boolean {
    return this.especialidad == especialidad.getEspecialidad();
  }

  public static crear(valor: string) {
    if (valor == null || valor == undefined) {
      throw new EspecialidadVacia('La Especialidad del Doctor no puede estar vacio');
    }

    return new Especialidad(valor);
  }
}

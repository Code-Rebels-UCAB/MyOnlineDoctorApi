import { IValueObject } from "../../../commun/dominio/values/IValueObject"

export class Especialidad implements IValueObject {
    private constructor(private readonly especialidad:string) {

    }
  
    public getEspecialidad() {
      return this.especialidad;
    }
  
    public esIgual(especialidad: Especialidad): boolean {
      return this.especialidad == especialidad.getEspecialidad()
    }
}
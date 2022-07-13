import { IValueObject } from 'interfaceVO';

export class NombreCompletoDoctor implements IValueObject {
  private constructor(
    private readonly nombre: string,
    private readonly apellido: string,
  ) {}

  public getNombre() {
    return this.nombre;
  }

  public getApellido() {
    return this.apellido;
  }

  public esIgual(nombreCompletoDoctor: NombreCompletoDoctor): boolean {
    return (
      this.nombre == nombreCompletoDoctor.getNombre() &&
      this.apellido == nombreCompletoDoctor.getApellido()
    );
  }
}

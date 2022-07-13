import { IValueObject } from '../../../commun/dominio/values/IValueObject';

export class NombrePaciente implements IValueObject {
  constructor(
    private readonly primer_nombre: string,
    private readonly segundo_nombre: string,
    private readonly primer_apellido: string,
    private readonly segundo_apellido: string,
  ) {}

  public getPrimerNombre(): string {
    return this.primer_nombre;
  }

  public getSegundoNombre(): string {
    return this.segundo_nombre;
  }

  public getPrimerApellido(): string {
    return this.primer_apellido;
  }

  public getSegundoApellido(): string {
    return this.segundo_apellido;
  }

  public esIgual(nombre: NombrePaciente): boolean {
    return (
      this.primer_nombre == nombre.getPrimerNombre() &&
      this.segundo_nombre == nombre.getSegundoNombre() &&
      this.primer_apellido == nombre.getPrimerApellido() &&
      this.segundo_apellido == nombre.getSegundoApellido()
    );
  }
}

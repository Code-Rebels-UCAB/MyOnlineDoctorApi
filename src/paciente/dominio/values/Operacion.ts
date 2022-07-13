import { IValueObject } from '../../../commun/dominio/values/IValueObject';
import { OperacionVacia } from '../excepciones/OperacionVacia';

export class Operacion implements IValueObject {
  private constructor(private readonly valor: string) {}

  public getOperacionValor() {
    return this.valor;
  }

  public esIgual(operacion: Operacion): boolean {
    return this.valor == operacion.getOperacionValor();
  }

  public static crear(valor: string) {
    // if (valor == '' || valor == null || valor == undefined) {
    //   throw new OperacionVacia(
    //     'La Operacion del Paciente no puede estar vacia',
    //   );
    // }

    return new Operacion(valor);
  }
}

import { IValueObject } from '../../../commun/dominio/values/IValueObject';

export class Operacion implements IValueObject {
  private constructor(private readonly valor: string) {}

  public getOperacionValor() {
    return this.valor;
  }

  public esIgual(operacion: Operacion): boolean {
    return this.valor == operacion.getOperacionValor();
  }

  public static crear(valor: string) {
    return new Operacion(valor);
  }
}

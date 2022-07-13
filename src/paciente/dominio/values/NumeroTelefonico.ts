import { IValueObject } from '../../../commun/dominio/values/IValueObject';
import { NumeroInvalido } from '../excepciones/NumeroInvalido';
import { NumeroVacio } from '../excepciones/NumeroVacio';

export class NumeroTelefonico implements IValueObject {
  private constructor(private readonly valor: string) {}

  public getNumeroTelefonicoValor() {
    return this.valor;
  }

  public esIgual(numeroTelefonico: NumeroTelefonico): boolean {
    return this.valor == numeroTelefonico.getNumeroTelefonicoValor();
  }

  public static crear(valor: string) {
    if (valor == '' || valor == null || valor == undefined) {
      throw new NumeroVacio(
        'El Numero Telefonico del Paciente no puede estar vacio',
      );
    } else if (valor.length != 11) {
      throw new NumeroInvalido('El Numero Telefonico es Invalido');
    }

    return new NumeroTelefonico(valor);
  }
}

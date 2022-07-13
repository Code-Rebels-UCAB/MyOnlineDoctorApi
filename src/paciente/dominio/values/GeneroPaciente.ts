import { TipoGenero } from '../../../commun/dominio/values/TipoGenero';
import { IValueObject } from '../../../commun/dominio/values/IValueObject';

export class GeneroPaciente implements IValueObject {
  private constructor(private readonly valor: TipoGenero) {}

  public getGeneroPacienteValor() {
    return this.valor;
  }

  public esIgual(generoPaciente: GeneroPaciente): boolean {
    return this.valor == generoPaciente.getGeneroPacienteValor();
  }

  public static crear(valor: TipoGenero) {
    return new GeneroPaciente(valor);
  }
}

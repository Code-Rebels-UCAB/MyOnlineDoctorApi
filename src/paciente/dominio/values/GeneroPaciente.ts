import { TipoGenero } from '../../../commun/dominio/values/TipoGenero';
import { IValueObject } from '../../../commun/dominio/values/IValueObject';
import { GeneroVacio } from '../excepciones/GeneroVacio';

export class GeneroPaciente implements IValueObject {
  private constructor(private readonly valor: TipoGenero) {}

  public getGeneroPacienteValor() {
    return this.valor;
  }

  public esIgual(generoPaciente: GeneroPaciente): boolean {
    return this.valor == generoPaciente.getGeneroPacienteValor();
  }

  public static crear(valor: TipoGenero) {
    if (valor == null || valor == undefined) {
      throw new GeneroVacio('El Genero del Paciente no puede estar vacio');
    }

    return new GeneroPaciente(valor);
  }
}

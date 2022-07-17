import { TipoGenero } from '../../../commun/dominio/values/TipoGenero';
import { IValueObject } from 'interfaceVO';
import { GeneroVacioDoctor } from '../excepciones/GeneroVacioDoctor';


export class GeneroDoctor implements IValueObject {
  private constructor(private readonly genero: TipoGenero) {}

  public getGeneroDoctor() {
    return this.genero;
  }

  public esIgual(generoDoctor: GeneroDoctor): boolean {
    return this.genero == generoDoctor.getGeneroDoctor();
  }

  public static crear(valor: TipoGenero) {
    if (valor == null || valor == undefined) {
      throw new GeneroVacioDoctor('El Genero del Doctor no puede estar vacio');
    }

    return new GeneroDoctor(valor);
  }
}

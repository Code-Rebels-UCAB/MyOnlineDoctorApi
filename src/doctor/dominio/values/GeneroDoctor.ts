import { TipoGenero } from '../../../commun/dominio/values/TipoGenero';
import { IValueObject } from 'interfaceVO';

export class GeneroDoctor implements IValueObject {
  private constructor(private readonly genero: TipoGenero) {}

  public getGeneroDoctor() {
    return this.genero;
  }

  public esIgual(generoDoctor: GeneroDoctor): boolean {
    return this.genero == generoDoctor.getGeneroDoctor();
  }
}

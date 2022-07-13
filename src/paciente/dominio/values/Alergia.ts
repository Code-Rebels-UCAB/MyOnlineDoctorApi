import { AlergiaVacio } from '../excepciones/AlergiaVacio';
import { IValueObject } from '../../../commun/dominio/values/IValueObject';

export class Alergia implements IValueObject {
  private constructor(private readonly alergia: string) {}

  public getAlergia(): string {
    return this.alergia;
  }

  public esIgual(alergia: Alergia): boolean {
    return this.alergia == alergia.getAlergia();
  }

  public static crear(alergia: string) {
    // if (alergia == null || alergia == undefined || alergia == ''){
    //   //LANZA LA EXCEPCION
    //   throw new AlergiaVacio('La Alergia del Paciente no puede estar vacia');
    // }
    return new Alergia(alergia);
  }
}

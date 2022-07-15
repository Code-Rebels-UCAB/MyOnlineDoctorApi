import {
  IExcepcion,
  IValoresExcepcion,
} from '../../../commun/dominio/excepcciones/IExcepcion';

export class EspecialidadVacia implements IExcepcion {
  public readonly origen = 'EspecialidadVacia';
  public constructor(public readonly mensaje: string) {}

  public getError(): IValoresExcepcion {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    };
  }
}

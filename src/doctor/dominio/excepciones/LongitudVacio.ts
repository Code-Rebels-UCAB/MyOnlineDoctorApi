import {
  IExcepcion,
  IValoresExcepcion,
} from '../../../commun/dominio/excepcciones/IExcepcion';

export class LongitudVacio implements IExcepcion {
  public readonly origen = 'LongitudVacio';

  constructor(public readonly mensaje: string) {}

  public getError(): IValoresExcepcion {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    };
  }
}

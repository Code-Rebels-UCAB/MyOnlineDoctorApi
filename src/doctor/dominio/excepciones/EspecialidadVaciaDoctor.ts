import {
  IExcepcion,
  IValoresExcepcion,
} from '../../../commun/dominio/excepcciones/IExcepcion';

export class EspecialidadVaciaDoctor implements IExcepcion {
  public readonly origen = 'EspecialidadVaciaDoctor';
  public constructor(public readonly mensaje: string) {}

  public getError(): IValoresExcepcion {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    };
  }
}

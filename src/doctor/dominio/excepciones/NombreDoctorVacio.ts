import {
  IExcepcion,
  IValoresExcepcion,
} from '../../../commun/dominio/excepcciones/IExcepcion';

export class NombreDoctorVacio implements IExcepcion {
  public readonly origen = 'NombreDoctorVacio';
  public constructor(public readonly mensaje: string) {}

  public getError(): IValoresExcepcion {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    };
  }
}

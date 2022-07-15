import {
  IExcepcion,
  IValoresExcepcion,
} from '../../../commun/dominio/excepcciones/IExcepcion';

export class PasswordDoctorVacio implements IExcepcion {
  public readonly origen = 'PasswordDoctorVacio';

  constructor(public readonly mensaje: string) {}

  public getError(): IValoresExcepcion {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    };
  }
}

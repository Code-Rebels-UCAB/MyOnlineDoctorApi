import {
    IExcepcion,
    IValoresExcepcion,
  } from '../../../commun/dominio/excepcciones/IExcepcion';
  
  export class StatusDoctorVacio implements IExcepcion {
    public readonly origen = 'StatusDoctorVacio';
  
    constructor(public readonly mensaje: string) {}
  
    public getError(): IValoresExcepcion {
      return {
        mensaje: this.mensaje,
        origen: this.origen,
      };
    }
  }
  
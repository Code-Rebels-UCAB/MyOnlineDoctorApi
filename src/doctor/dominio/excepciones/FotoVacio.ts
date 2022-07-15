import {
    IExcepcion,
    IValoresExcepcion,
  } from '../../../commun/dominio/excepcciones/IExcepcion';
  
  export class FotoVacio implements IExcepcion {
    public readonly origen = 'FotoVacio';
  
    constructor(public readonly mensaje: string) {}
  
    public getError(): IValoresExcepcion {
      return {
        mensaje: this.mensaje,
        origen: this.origen,
      };
    }
  }
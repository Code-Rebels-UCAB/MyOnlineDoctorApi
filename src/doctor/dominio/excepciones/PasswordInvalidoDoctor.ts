import {
    IExcepcion,
    IValoresExcepcion,
  } from '../../../commun/dominio/excepcciones/IExcepcion';
  
  export class PasswordInvalidoDoctor implements IExcepcion {
    public readonly origen = 'PasswordInvalidoDoctor';
  
    constructor(public readonly mensaje: string) {}
  
    public getError(): IValoresExcepcion {
      return {
        mensaje: this.mensaje,
        origen: this.origen,
      };
    }
  }
import { IExcepcion } from "../../../commun/dominio/excepciones/IExcepcion"

export class PacienteMenorEdad implements IExcepcion {
    public readonly origen = 'PacienteMenorEdad'
    public constructor(public readonly mensaje: string) {}
  
    public getError() {
      return {
        mensaje: this.mensaje,
        origen: this.origen,
      }
    }
}
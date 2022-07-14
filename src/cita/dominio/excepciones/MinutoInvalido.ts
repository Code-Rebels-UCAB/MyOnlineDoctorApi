import { IExcepcion } from "../../../commun/dominio/excepciones/IExcepcion"

export class MinutoInvalido implements IExcepcion {
    public readonly origen = 'MinutoInvalido'
    public constructor(public readonly mensaje: string) {}
  
    public getError() {
      return {
        mensaje: this.mensaje,
        origen: this.origen,
      }
    }
}
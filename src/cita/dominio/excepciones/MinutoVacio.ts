import { IExcepcion } from "../../../commun/dominio/excepcciones/IExcepcion"

export class MinutoVacia implements IExcepcion {
    public readonly origen = 'MinutoVacio'
    public constructor(public readonly mensaje: string) {}
  
    public getError() {
      return {
        mensaje: this.mensaje,
        origen: this.origen,
      }
    }
}
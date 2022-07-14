import { IExcepcion } from "../../../commun/dominio/excepciones/IExcepcion"

export class AlergiaVacio implements IExcepcion {
    public readonly origen = 'AlergiaVacio'
    public constructor(public readonly mensaje: string) {}
  
    public getError() {
      return {
        mensaje: this.mensaje,
        origen: this.origen,
      }
    }
}
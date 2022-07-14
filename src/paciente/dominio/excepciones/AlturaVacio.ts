import { IExcepcion } from "../../../commun/dominio/excepciones/IExcepcion"

export class AlturaVacio implements IExcepcion {
    public readonly origen = 'AlturaVacio'
    public constructor(public readonly mensaje: string) {}
  
    public getError() {
      return {
        mensaje: this.mensaje,
        origen: this.origen,
      }
    }
}
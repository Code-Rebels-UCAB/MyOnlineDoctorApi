import { IExcepcion } from "../../../commun/dominio/excepcciones/IExcepcion"

export class FechaNacimientoVacio implements IExcepcion {
    public readonly origen = 'FechaNacimientoVacio'
    public constructor(public readonly mensaje: string) {}
  
    public getError() {
      return {
        mensaje: this.mensaje,
        origen: this.origen,
      }
    }
}
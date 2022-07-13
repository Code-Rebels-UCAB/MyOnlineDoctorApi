import { IExcepcion } from "../../../commun/dominio/excepcciones/IExcepcion"

export class AntecedentesVacio implements IExcepcion {
    public readonly origen = 'AntecedentesVacio'
    public constructor(public readonly mensaje: string) {}
  
    public getError() {
      return {
        mensaje: this.mensaje,
        origen: this.origen,
      }
    }
}
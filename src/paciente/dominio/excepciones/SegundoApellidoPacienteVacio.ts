import { IExcepcion } from "../../../commun/dominio/excepciones/IExcepcion"

export class SegundoApellidoPacienteVacio implements IExcepcion {
    public readonly origen = 'SegundoApellidoPacienteVacio'
    public constructor(public readonly mensaje: string) {}
  
    public getError() {
      return {
        mensaje: this.mensaje,
        origen: this.origen,
      }
    }
}
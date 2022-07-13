import { IExcepcion } from "../../../commun/dominio/excepcciones/IExcepcion"

export class PrimerApellidoPacienteVacio implements IExcepcion {
    public readonly origen = 'PrimerApellidoPacienteVacio'
    public constructor(public readonly mensaje: string) {}
  
    public getError() {
      return {
        mensaje: this.mensaje,
        origen: this.origen,
      }
    }
}
import { IValueObject } from "../../../commun/dominio/values/IValueObject"

export class HoraCita implements IValueObject {
    constructor (private readonly _hora: number,  private readonly _minuto:number) {}

    public get horaCita() : string {
        return this.convertirString(this._hora)+ ":"+this.convertirString(this._minuto);
    }

    private convertirString(entrada: number){
        if (entrada < 10) {
            return '0'+entrada.toString()
        }
        return entrada.toString();
    }


    public esIgual(horaCita: HoraCita): boolean {
        if (horaCita._hora == this._hora && horaCita._minuto == this._minuto){
            return true;
        }
        return false;
    }
}
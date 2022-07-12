import { IValueObject } from "../../../commun/dominio/values/IValueObject"


export class Motivo implements IValueObject{
    constructor ( readonly _motivo: string ) {}
    
    public get motivo() : string {
        return this._motivo;
    }

    public esIgual(motivo: Motivo): boolean {        
        return this._motivo == motivo.motivo;
    }
    
}
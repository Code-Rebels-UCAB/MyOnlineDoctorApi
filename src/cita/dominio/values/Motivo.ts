import { IValueObject } from "interfaceVO";


export class Motivo implements IValueObject{
    constructor ( readonly _motivo: string ) {}
    
    public get motivo() : string {
        return this._motivo;
    }

    public esIgual(motivo: Motivo): boolean {        
        return this._motivo == motivo.motivo;
    }
    
}
import { IValueObject } from "interfaceVO";


export class Prescripcion implements IValueObject{
    constructor (private readonly _prescripcion: string ) {}
    
    public get prescripcion() : string {
        return this._prescripcion;
    }

    public esIgual(prescripcion: Prescripcion): boolean {        
        return this._prescripcion == prescripcion.prescripcion;
    }
    
}
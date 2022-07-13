import { IValueObject } from "interfaceVO";


export class Diagnostico implements IValueObject{
    constructor (private readonly _diagnostico: string ) {}
    
    public getDiagnostico() : string {
        return this._diagnostico;
    }

    public esIgual(diagnostico: Diagnostico): boolean {        
        return this._diagnostico == diagnostico.getDiagnostico();
    }
    
}
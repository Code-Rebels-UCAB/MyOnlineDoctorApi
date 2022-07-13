import { IValueObject } from "interfaceVO";
import { DiagnosticoVacio } from "../excepciones/DiagnosticoVacio";


export class Diagnostico implements IValueObject{
    private constructor (private readonly _diagnostico: string ) {}
    
    public getDiagnostico() : string {
        return this._diagnostico;
    }

    public esIgual(diagnostico: Diagnostico): boolean {        
        return this._diagnostico == diagnostico.getDiagnostico();
    }

    public static crear(_diagnostico: string){
        if(_diagnostico == null || _diagnostico == undefined || _diagnostico == ''){
            throw new DiagnosticoVacio('El Diagnostico en el registro medico no puede estar vacio');
        }
        return new Diagnostico(_diagnostico);
    }
    
}
import { IValueObject } from "interfaceVO";
import { PrescripcionVacio } from "../excepciones/PrescripccionVacio";


export class Prescripcion implements IValueObject{
    constructor (private readonly _prescripcion: string ) {}
    
    public getPrescripcion() : string {
        return this._prescripcion;
    }

    public esIgual(prescripcion: Prescripcion): boolean {        
        return this._prescripcion == prescripcion.getPrescripcion();
    }
    
    public static crear(_prescripcion: string){
        if(_prescripcion == null || _prescripcion == undefined || _prescripcion == ''){
            throw new PrescripcionVacio('La Prescripccion no pueden estar vacio en el registro medico');
        }
        return new Prescripcion(_prescripcion);
    }
}

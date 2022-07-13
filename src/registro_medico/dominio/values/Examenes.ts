import { IValueObject } from "interfaceVO";
import { ExamenesVacio } from "../excepciones/ExamenesVacio";


export class Examenes implements IValueObject{
    private constructor (private readonly _examenes: string ) {}
    
    public getExamenes() : string {
        return this._examenes;
    }

    public esIgual(examenes: Examenes): boolean {        
        return this._examenes == examenes.getExamenes();
    }

    public static crear(_examenes: string){
        if(_examenes == null || _examenes == undefined || _examenes == ''){
            throw new ExamenesVacio('Los examenes no pueden estar vacio en el registro medico');
        }
        return new Examenes(_examenes);
    } 
}

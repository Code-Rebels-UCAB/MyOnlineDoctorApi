import { IValueObject } from "interfaceVO";
import { MotivoVacio } from "../excepciones/MotivoVacio";


export class Motivo implements IValueObject{
    private constructor (private readonly _motivo: string ) {}
    
    public get motivo() : string {
        return this._motivo;
    }

    public esIgual(motivo: Motivo): boolean {        
        return this._motivo == motivo.motivo;
    }

    public static crear(motivo:string){
        if(motivo == null || motivo == undefined || motivo == ''){
          throw new MotivoVacio('El motivo de la cita no puede estar vacio')
        }
        return new Motivo(motivo);
        
    }   
}
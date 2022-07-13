import { IValueObject } from "interfaceVO";
import { HistoriaVacio } from "../excepciones/HistoriaVacio";


export class Historia implements IValueObject{
    private constructor (private readonly _historia: string ) {}
    
    public getHistoria() : string {
        return this._historia;
    }

    public esIgual(historia: Historia): boolean {        
        return this._historia == historia.getHistoria();
    }

    public static crear(_historia: string){
        if(_historia == null || _historia == undefined || _historia == ''){
            throw new HistoriaVacio('La historia en el registro medico no puede estar vacia');
        }
        return new Historia(_historia);
    }
    
}
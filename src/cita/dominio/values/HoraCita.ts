import { IValueObject } from "../../../commun/dominio/values/IValueObject"
import { HoraInvalida } from "../excepciones/HoraInvalida";
import { HoraVacia } from "../excepciones/HoraVacia";
import { MinutoInvalido } from "../excepciones/MinutoInvalido";
import { MinutoVacia } from "../excepciones/MinutoVacio";

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

    public static crear(hora:number, minuto:number){
        if(hora == null || hora == undefined){
            throw new HoraVacia('La hora de la cita no puede estar vacia');
        }
        else if(hora < 0 || hora > 24){
            throw new HoraInvalida('La hora es invalida');
        }
        else if(minuto == null || minuto == undefined){
            throw new MinutoVacia('El minuto de la cita no puede estar vacia');
        }
        else if(minuto < 0 || minuto > 60){
            throw new MinutoInvalido('El minuto es invalido');
        }
        return new HoraCita(hora,minuto);

    }   

}
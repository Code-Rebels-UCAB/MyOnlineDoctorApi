import { EventoDominio } from "../../dominio/eventos/Evento";
import { IObservable } from "../IObservable";
import { IObservador } from "../IObservador";


export class ManejadorEventos<D> implements IObservable<EventoDominio,D>{
    private Eventos: EventoDominio[];


    constructor(){
       this.Eventos = [];
    }

    public AddEvento(...eventos:EventoDominio[]){
        this.Eventos = this.Eventos.concat(eventos);
    }

    Notify(data?: D): void {

        this.Vaciar();
    }

    Add(observer: IObservador<EventoDominio,D>): void {  
    }

    Remove(posicion: number): void {
    }

    private Vaciar():void{
        this.Eventos = [];
    }



}
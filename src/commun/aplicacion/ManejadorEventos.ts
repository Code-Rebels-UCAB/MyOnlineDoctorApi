import { EventoDominio } from "../dominio/eventos/Evento";
import { IObservable } from "./IObservable";
import { IObservador } from "./IObservador";


export class ManejadorEventos<D> implements IObservable<EventoDominio,D>{
    private Eventos: EventoDominio[];
    private Observadores: IObservador<EventoDominio,D>[];

    constructor(){
       this.Eventos = [];
       this.Observadores = [];
    }

    public AddEvento(...eventos:EventoDominio[]){
        this.Eventos = this.Eventos.concat(eventos);
    }

    Notify(data?: D): void {
        for (const observer of this.Observadores) {
            for (const evento of this.Eventos) {
                observer.Update(evento, data);
            }
        }
        this.Vaciar();
    }

    Add(observer: IObservador<EventoDominio,D>): void {
        this.Observadores.push(observer);
    }

    Remove(posicion: number): void {
        this.Observadores.filter( (observador, index) => {
            index != posicion;
        })
    }

    private Vaciar():void{
        this.Eventos = [];
    }



}
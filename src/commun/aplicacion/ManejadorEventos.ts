import { EventoDominio } from "../dominio/eventos/Evento";
import { IObservable } from "./IObservable";
import { IObservador } from "./IObservador";


export class ManejadorEventos implements IObservable<EventoDominio>{
    private Eventos: EventoDominio[];
    private Observadores: IObservador<EventoDominio>[];

    public AddEvento(...eventos:EventoDominio[]){
        this.Eventos.concat(eventos);
    }

    Notify(): void {
        for (const observer of this.Observadores) {
            for (const evento of this.Eventos) {
                observer.Update(evento);
            }
        }
    }

    Add(observer: IObservador<EventoDominio>): void {
        this.Observadores.push(observer);
    }

    Remove(posicion: number): void {
        this.Observadores.filter( (observador, index) => {
            index != posicion;
        })
    }



}
import { EventoDominio } from "../../dominio/eventos/Evento";
import { IObservador } from "../IObservador";
import { IServicioAplicacion } from "../IServicioAplicacion";
import { Resultado } from "../Resultado";

export interface IPolitica<E,T> extends IObservador<EventoDominio,E>, IServicioAplicacion<E,T>{

    Update(context:EventoDominio, data: E):void;
    ejecutar(data: E): Promise<Resultado<T>>

}
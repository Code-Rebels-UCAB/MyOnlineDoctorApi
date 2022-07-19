import { IObservador } from "./IObservador";


    export interface IObservable<E,D>{

        Notify(data?:D):void;
        Add(observer: IObservador<E,D>):void;
        Remove(posicion: number):void;

    }
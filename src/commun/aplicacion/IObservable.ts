import { IObservador } from "./IObservador";


    export interface IObservable<E>{

        Notify():void;
        Add(observer: IObservador<E>):void;
        Remove(posicion: number):void;

    }
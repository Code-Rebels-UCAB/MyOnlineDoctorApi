

    export interface IObservador<E,D>{

        Update(context:E, data: D):void;

    }
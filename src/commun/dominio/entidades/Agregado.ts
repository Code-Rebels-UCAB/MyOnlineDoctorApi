import { EventoDominio } from "../eventos/Evento";
import { IEntidad } from "./IEntidad";

export abstract class Agregado<E> implements IEntidad<E> {
    private eventos: EventoDominio[] = []
  
    //METODOS IMPLEMENTADOS DEL CONTRATO DE ENTIDAD
    abstract obtenerIdentificador():E
    abstract esIgual(entidad: IEntidad<E>): boolean

    //METODOS PROPIOS DE AGREGADO
    protected agregarEvento(eventoDominio: EventoDominio): void {
      this.eventos.push(eventoDominio);
    }
  
    public limpiarEventos(): void {
      this.eventos = []
    }
  
    public obtenerEventos(): EventoDominio[] {
      return this.eventos
    }
}


export interface IEntidad<E> {
  obtenerIdentificador(): E;
  esIgual(entidad: IEntidad<E>): boolean;
}

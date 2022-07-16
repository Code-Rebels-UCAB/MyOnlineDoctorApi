import { Resultado } from './Resultado'

export interface IServicioAplicacion <E,T> {
  ejecutar(data: E): Promise<Resultado<T>>
}
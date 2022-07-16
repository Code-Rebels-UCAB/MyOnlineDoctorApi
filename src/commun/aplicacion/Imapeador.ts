

export interface Imapeador<E,S> {

    convertirEntradaEnSalida(entrada:E):S
    convertirSalidaEnEntrada(entrada:S):E

}
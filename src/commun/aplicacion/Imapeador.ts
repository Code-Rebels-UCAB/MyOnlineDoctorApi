

export interface Imapeador<E,S> {

    convertirDominioEnPersistencia(entrada:E):S
    convertirPersistenciaEnDominio(entrada:S):E

}
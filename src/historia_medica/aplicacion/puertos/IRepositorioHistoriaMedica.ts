

export interface IRepositorioHistoriaMedica {  
    
    //QUERYS
    obtenerHistoriaById(id: string);

    //COMANDOS
    crearHistoriaMedica(id: string, pacienteId:string);


}
  
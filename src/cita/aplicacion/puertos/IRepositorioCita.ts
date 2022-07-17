

export interface IRepositorioCita {  
    
    //QUERYS
    obtenerTodasLasCitas();

    obtenercitaById(id_cita: string);

    obtenercitaByDoctor(id_doctor: string);

    obtenercitaByPaciente(id_paciente: string);
    
    obtenercitaByFecha(fecha: string);

    //Comandos
    crearCita();

    actualizarStatusCita();


}
  
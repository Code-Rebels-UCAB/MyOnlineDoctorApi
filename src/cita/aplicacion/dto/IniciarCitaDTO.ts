export interface IniciarCitaDTO {
    idCita: string;
    idPaciente: string;
    idDoctor: string;
    status: string;
    modalidad: string;
    motivo: string;
    fechaCita: string;
    horaCita: string;
    duracion: string;
    videollamada:{
        nombreCanal: string,
        tokenTemp: string
    }

}
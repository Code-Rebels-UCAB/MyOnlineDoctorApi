

export interface ConsultarRegistroMedicoQueryDTO {
    idRegistroMedico: string;
}

export interface ConsultarRegistroMedicoRespuestaDTO{
    idRegistroMedico : string
	idCita : string
	idDoctor : string
	plan : string
	diagnostico : string
	prescripcion : string
	historia : string
}

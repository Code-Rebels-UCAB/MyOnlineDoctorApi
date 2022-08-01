import { ConsultarPacienteRespuestaDTO } from "../dto/queries/ConsultarPaciente.query";

export interface IRepositorioPaciente {
  
  registrarPaciente(pacienteNuevo: ConsultarPacienteRespuestaDTO);

  //QUERIES
  obtenerCantidadTotalPacientes();
  guardarTokenPaciente(pacienteid: string, tokenPaciente: string);
  obtenerPacienteById(id: string);
  buscarDatosIniciarSesionPaciente(correoPaciente: string);
  obtenerPacienteByNombreorApellido(nombre: string);
  obtenerPacienteByTelefono(telefono: string);

  //COMANDOS
  bloquearPaciente(id: string);
  suspenderPaciente(id: string);
}

export const IRepositorioPaciente = Symbol("IRepositorioPaciente");
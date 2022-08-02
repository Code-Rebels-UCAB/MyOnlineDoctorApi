import { RegistroMedicoDTO } from "../dto/RegistroMedicoDTO";
import { RegistroMedicoRespuestaDTO } from "../dto/RegistroMedicoRespuestaDTO";

export interface IRepositorioRegistroMedico {

  CrearRegistro(datos: RegistroMedicoDTO);
  ObtenerPacienteAsociado(CitaId: string);
  ObtenerCitaAsociada(RegistroId: string);
  ObtenerHistoriaMedicaAsociada(citaId: string);
  ObtenerRegistroMedicobyID(RegistroMedicoId: string);
  actualizarRegistroMedico(datos: RegistroMedicoRespuestaDTO);
  ObtenerRegistrosMedicosByPaciente(paciente: string);

}

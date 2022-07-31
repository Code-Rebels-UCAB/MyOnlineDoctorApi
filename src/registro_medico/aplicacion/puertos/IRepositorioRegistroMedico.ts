import { RegistroMedicoDTO } from "../dto/RegistroMedicoDTO";

export interface IRepositorioRegistroMedico {

  CrearRegistro(datos: RegistroMedicoDTO);
  ObtenerPacienteAsociado(CitaId: string)
  ObtenerHistoriaMedicaAsociada(citaId: string);

}

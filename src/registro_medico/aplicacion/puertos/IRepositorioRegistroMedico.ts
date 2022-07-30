import { CrearRegistroMedicoDTO } from "../dto/CrearRegistroMedicoDTO";

export interface IRepositorioRegistroMedico {
  
  CrearRegistro(datos: CrearRegistroMedicoDTO);

}

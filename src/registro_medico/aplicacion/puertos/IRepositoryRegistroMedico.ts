import { RegistroMedicoDataDTO } from "../dto/RegistroMedicoDataDTO";
export interface IRepositorioRegistroMedico {
  crear(comando: RegistroMedicoDataDTO): Promise<void>;
  obtener(id: string): Promise<RegistroMedicoDataDTO>;
}

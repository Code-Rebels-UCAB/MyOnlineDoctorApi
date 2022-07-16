export interface RegistroMedicoPersistenciaDTO {
  idRegistroMedico: string;
  idCita: string;
  idDoctor: string;
  examenes: string;
  plan: string;
  diagnostico: string;
  prescripcion: string;
  historia: string;
}

export interface IRepositorioRegistroMedico {
  crear(comando: RegistroMedicoPersistenciaDTO): Promise<void>;
  obtener(id: string): Promise<RegistroMedicoPersistenciaDTO>;
  modificar(id: string, examenes?);
}

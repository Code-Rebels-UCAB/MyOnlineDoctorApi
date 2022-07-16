import { HistoriaMedicaDataDTO } from '../dto/HistoriaMedicaDataDTO';

export interface IRepositorioHistoriaMedica {
  crear(historiaMedica: HistoriaMedicaDataDTO): Promise<void>;
  obtener(id: string): Promise<HistoriaMedicaDataDTO>;
}

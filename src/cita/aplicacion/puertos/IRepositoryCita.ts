import { CitaDataDTO } from "../dto/CitaDataDTO";


export interface IRepositorioCita {
    obtener(id: string): Promise<CitaDataDTO>;
}
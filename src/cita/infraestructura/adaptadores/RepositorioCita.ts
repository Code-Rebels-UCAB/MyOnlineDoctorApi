import { CitaDataDTO } from "src/cita/aplicacion/dto/CitaDataDTO";
import { IRepositorioCita } from "src/cita/aplicacion/puertos/IRepositoryCita";
import { Repository } from "typeorm";
import { CitaORM } from "../persistencia/Cita.orm";
import { InjectRepository } from "@nestjs/typeorm";

export class RepositorioCita implements IRepositorioCita{
    
    constructor(@InjectRepository(CitaORM) private readonly repositoryCita: Repository<CitaORM>) { }
    
    async obtener(id: string): Promise<CitaDataDTO> {
        try {
            const cita = this.repositoryCita.find({
                where: {
                    id_cita: id
                }
            });

            const citaData: CitaDataDTO = null;
            return citaData;
        } catch (error) {
            
        }
    }
}
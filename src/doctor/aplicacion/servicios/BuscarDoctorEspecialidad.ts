import { ILogger } from "../../../commun/aplicacion/ILogger";
import { DoctorEspecialidadDTO } from "../dtos/DoctorEspecialidadDTO"
import { IRepositorioDoctor } from "../puertos/IRepositorioDoctor"

export class BuscarDoctorEspecialidad 
{
    public constructor(
        private readonly logger: ILogger,
        private readonly repositorioDoctor: IRepositorioDoctor,
    ) {}

    public async ejecutar(query: string): Promise<any> {
        try {
            // Obtenemos los datos del empleado de persistencia
            const doctor = await this.repositorioDoctor.obtenerDoctorByEspecialidad(
                query,
            );
            this.logger.log("Buscar por especailidad: " + query, "Doctor Encontrado");
            return doctor;        
        }
        catch (error) {
            throw error;
        }
    }
}

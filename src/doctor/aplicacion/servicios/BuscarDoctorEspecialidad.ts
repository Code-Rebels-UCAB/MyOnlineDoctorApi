import { DoctorEspecialidadDTO } from "../dtos/DoctorEspecialidadDTO"
import { IRepositorioDoctor } from "../puertos/IRepositorioDoctor"

export class BuscarDoctorEspecialidad 
{
  public constructor(
    private readonly repositorioDoctor: IRepositorioDoctor,
  ) {}

    public async ejecutar(query: DoctorEspecialidadDTO): Promise<any> {
        try {
            // Obtenemos los datos del empleado de persistencia
            const doctor = await this.repositorioDoctor.obtenerDoctorByEspecialidad(
                query.especialidad,
            );

            return doctor;
        
        }
        catch (error) {
            throw error;
        }
    }
}

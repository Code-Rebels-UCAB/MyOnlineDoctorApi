import { ILogger } from "../../../commun/aplicacion/ILogger";
import { DoctorEspecialidadDTO } from "../dtos/DoctorEspecialidadDTO"
import { DoctorMapeador } from "../mapeadores/DoctorMapeador";
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
            const doctores = await this.repositorioDoctor.obtenerDoctorByEspecialidad(
                query,
            );

            //Mapear de persistencia a dominio
            // const obtenerdoctor = DoctorMapeador.covertirPersistenciaDominio(doctor);
             
            // console.log(obtenerdoctor);
            const DoctoresDominio = doctores.map((datos) =>
                DoctorMapeador.covertirPersistenciaDominio(datos),
            )

             console.log(DoctoresDominio)   ;


            this.logger.log("Buscar por especailidad: " + query, "Doctor Encontrado");
            return doctores;        
        }
        catch (error) {
            throw error;
        }
    }
}

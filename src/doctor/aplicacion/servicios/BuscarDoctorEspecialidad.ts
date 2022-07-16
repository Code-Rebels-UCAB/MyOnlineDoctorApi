import { Doctor } from "../../dominio/entidades/Doctor";
import { ILogger } from "../../../commun/aplicacion/ILogger";
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
            const DoctoresDominio: Doctor[] = doctores.map((datos) =>
                DoctorMapeador.covertirPersistenciaDominio(datos),
            )


            //Mapeamos de dominio a la vista
            const ListadoDoctores = DoctoresDominio.map((datos) =>
                DoctorMapeador.ConvertirDoctoresEnListado(datos),
            )

            this.logger.log("Buscar por especailidad: " + query, "Doctor Encontrado");

            return ListadoDoctores;        
        }
        catch (error) {
            throw error;
        }
    }
}

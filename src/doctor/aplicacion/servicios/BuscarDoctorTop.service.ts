import { Doctor } from "../../dominio/entidades/Doctor";
import { ILogger } from "../../../commun/aplicacion/puertos/ILogger";
import { DoctorMapeador } from "../mapeadores/DoctorMapeador";
import { IRepositorioDoctor } from "../puertos/IRepositorioDoctor"
import { IServicioAplicacion } from "../../../commun/aplicacion/IServicioAplicacion";
import { Resultado } from "../../../commun/aplicacion/Resultado";
import { ListadoDoctoresDTO } from "../dtos/ListadoDoctoresDTO";
import { IExcepcion } from "../../../commun/dominio/excepcciones/IExcepcion";

export class BuscarDoctorTop implements IServicioAplicacion<void,ListadoDoctoresDTO[]>
{
    public constructor(
        private readonly logger: ILogger,
        private readonly repositorioDoctor: IRepositorioDoctor,
    ) {}



    async ejecutar(): Promise<Resultado<ListadoDoctoresDTO[]>> {
         try {
            // Obtenemos los datos del empleado de persistencia
            const doctores = await this.repositorioDoctor.obtenerTopDoctores();

            //Mapear de persistencia a dominio
            const DoctoresDominio: Doctor[] = doctores.map((datos) =>
                DoctorMapeador.covertirPersistenciaDominio(datos),
            )
      
            //Mapeamos de dominio a la vista
            const ListadoDoctores = DoctoresDominio.map((datos) =>
                DoctorMapeador.ConvertirDoctoresEnListado(datos),
            )

            //Ordenar la lista por calificacion
            let ListadoDoctoresCalificacion: ListadoDoctoresDTO[] = ListadoDoctores.sort((a,b) => b.calificacion - a.calificacion);

            let total_doctores = 0
            if (ListadoDoctoresCalificacion.length > 0) {
                total_doctores = ListadoDoctoresCalificacion.length
            }
            this.logger.log("Buscar por top doctores: " , "Doctores Encontrados: " + total_doctores);

            return Resultado.Exito<ListadoDoctoresDTO[]>(ListadoDoctoresCalificacion);

        }
        catch (error) {
            let errores: IExcepcion = error;
            this.logger.error("Error inesperado: ", errores.mensaje);
            return Resultado.Falla(error);
            
        }
    }
}
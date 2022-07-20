import { Doctor } from "../../dominio/entidades/Doctor";
import { ILogger } from "../../../commun/aplicacion/puertos/ILogger";
import { DoctorMapeador } from "../mapeadores/DoctorMapeador";
import { IRepositorioDoctor } from "../puertos/IRepositorioDoctor"
import { IServicioAplicacion } from "../../../commun/aplicacion/IServicioAplicacion";
import { Resultado } from "../../../commun/aplicacion/Resultado";
import { ListadoDoctoresDTO } from "../dtos/ListadoDoctoresDTO";
import { IExcepcion } from "../../../commun/dominio/excepcciones/IExcepcion";

export class BuscarTodosDoctores implements IServicioAplicacion<void,ListadoDoctoresDTO[]>
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

            let total_doctores = 0
            if (ListadoDoctores.length > 0) {
                total_doctores = ListadoDoctores.length
            }
            this.logger.log("Busqueda de todos los doctores", "Doctores Encontrados: " + total_doctores);

            return Resultado.Exito<ListadoDoctoresDTO[]>(ListadoDoctores);

        }
        catch (error) {
            let errores: IExcepcion = error;
            this.logger.error("Error inesperado: ", errores.mensaje);
            return Resultado.Falla(error);
            
        }
    }
}

import { ILogger } from "src/commun/aplicacion/Ilogger";
import { IServicioAplicacion } from "src/commun/aplicacion/IServicioAplicacion";
import { Resultado } from "src/commun/aplicacion/Resultado";
import { IExcepcion } from "src/commun/dominio/excepcciones/IExcepcion";
import { ListadoDoctoresDTO } from "../dtos/ListadoDoctoresDTO";
import { DoctorMapeador } from "../mapeadores/DoctorMapeador";
import { IRepositorioDoctor } from "../puertos/IRepositorioDoctor";


export class CalificarDoctor implements IServicioAplicacion<string, ListadoDoctoresDTO>{

    constructor(
        private readonly logger: ILogger,
        private readonly repositorioDoctor: IRepositorioDoctor,
    ){}

    async ejecutar(data: string): Promise<Resultado<ListadoDoctoresDTO>> {
        try {
            const doctores = await this.repositorioDoctor.obtenerDoctorByNombreorApellido(
                data,
            );
            const ListadoDoctores = doctores.map((datos) =>
                DoctorMapeador.ConvertirDoctoresEnListado(datos),
            )
            this.logger.log("Buscar por Nombre y Apellido: " + data, "Doctores Encontrados: " + ListadoDoctores.length);
            return Resultado.Exito<ListadoDoctoresDTO>(ListadoDoctores);
        } catch (error) {
            let errores: IExcepcion = error;
            this.logger.error("Error inesperado: " + data, errores.mensaje);
            return Resultado.Falla(error);
        }
    }
    
}
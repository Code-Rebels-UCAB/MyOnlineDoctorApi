import { IServicioAplicacion } from "src/commun/aplicacion/IServicioAplicacion";
import { IExcepcion } from "../../../commun/dominio/excepcciones/IExcepcion";
import { ILogger } from "../../../commun/aplicacion/puertos/ILogger";
import { Resultado } from "../../../commun/aplicacion/Resultado";
import { PerfilDoctorDTO } from "../dtos/PerfilDoctorDTO";
import { IRepositorioDoctor } from "../puertos/IRepositorioDoctor";
import { DoctorMapeador } from "../mapeadores/DoctorMapeador";


export class BuscarDatosPerfil implements IServicioAplicacion<string, PerfilDoctorDTO>{

    constructor(
        private readonly logger: ILogger,
        private readonly repositorioDoctor: IRepositorioDoctor,
    ) {}

    async ejecutar(doctorId: string): Promise<Resultado<PerfilDoctorDTO>> {

        try{
            const doctor = await this.repositorioDoctor.obtenerDatosDoctor(doctorId);
            const perfilDoctor = DoctorMapeador.ConvertirAPerfilDoctorDTO(doctor);
            this.logger.log("Perfil del Doctor: " + perfilDoctor.nombre, '');
            return Resultado.Exito<PerfilDoctorDTO>(perfilDoctor);
        }
        catch (error) {
            let errores: IExcepcion = error;
            this.logger.error("Error inesperado:", errores.mensaje);
            return Resultado.Falla(error);
        }
    }

}
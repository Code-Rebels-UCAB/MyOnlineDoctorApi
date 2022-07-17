import { ILogger } from "../../../commun/aplicacion/ILogger";
import { IServicioAplicacion } from "../../../commun/aplicacion/IServicioAplicacion";
import { Resultado } from "../../../commun/aplicacion/Resultado";
import { IRepositorioCita } from "../puertos/IRepositorioCita";
import { IExcepcion } from "../../../commun/dominio/excepcciones/IExcepcion";
import { CitaPacienteDTO } from "../dto/CitasPacienteDTO";


export class BuscarCitasPaciente implements IServicioAplicacion<string,CitaPacienteDTO[]>
{
    public constructor(
        private readonly logger: ILogger,
        private readonly repositorioCita: IRepositorioCita,
    ) {}


    async ejecutar(pacienteid: string): Promise<Resultado<CitaPacienteDTO[]>> {
        try{
            const CitasPaciente: CitaPacienteDTO[] = await this.repositorioCita.obtenerCitaByPaciente(pacienteid);
            
            return Resultado.Exito<CitaPacienteDTO[]>(CitasPaciente);
            
        }
        catch (error) {
            let errores: IExcepcion = error;
            this.logger.error("Error inesperado:", errores.mensaje);
            return Resultado.Falla(error);
        }

    }



}
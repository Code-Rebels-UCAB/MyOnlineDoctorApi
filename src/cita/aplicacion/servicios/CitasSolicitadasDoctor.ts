import { ILogger } from "../../../commun/aplicacion/ILogger";
import { IServicioAplicacion } from "src/commun/aplicacion/IServicioAplicacion";
import { Resultado } from "../../../commun/aplicacion/Resultado";
import { CitaDataDTO } from "../dto/CitaDataDTO";
import { IRepositorioCita } from "../puertos/IRepositorioCita";



export class CitasSolicitadasDoctor implements IServicioAplicacion<string,any>
{
    public constructor(
        private readonly logger: ILogger,
        private readonly repositorioCita: IRepositorioCita,
    ) {}


    async ejecutar(doctorid: string): Promise<Resultado<any>> {
        try{
            const CitasSolicidas = await this.repositorioCita.obtenerCitaDeDoctorByStatus('Solicitada',doctorid);

            return Resultado.Exito<any>(CitasSolicidas);
        }
        catch (error) {

        }

    }



}

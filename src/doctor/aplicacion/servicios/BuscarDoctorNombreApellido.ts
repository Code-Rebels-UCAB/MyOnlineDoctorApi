import { ILogger } from "src/commun/aplicacion/Ilogger";
import { IServicioAplicacion } from "src/commun/aplicacion/IServicioAplicacion";
import { Resultado } from "src/commun/aplicacion/Resultado";
import { ListadoDoctoresDTO } from "../dtos/ListadoDoctoresDTO";
import { IRepositorioDoctor } from "../puertos/IRepositorioDoctor";


export class BuscarDoctorNombreApellido implements IServicioAplicacion<string, ListadoDoctoresDTO[]>{

    constructor(
        private readonly logger: ILogger,
        private readonly repositorioDoctor: IRepositorioDoctor,
    ) {}



    ejecutar(data: string): Promise<Resultado<ListadoDoctoresDTO[]>> {
        try {
            return
        } catch (error) {
            
        }
        
    }
}
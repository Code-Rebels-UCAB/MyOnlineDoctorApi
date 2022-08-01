import { IServicioAplicacion } from "../../../commun/aplicacion/IServicioAplicacion";
import { Resultado } from "../../../commun/aplicacion/Resultado";
import { ListadoRegistrosMedicoDTO } from "../dto/ListadoRegistrosMedicosDTO";

class ObtenerRegistrosPaciente implements IServicioAplicacion<string, ListadoRegistrosMedicoDTO>{
    ejecutar(data: string): Promise<Resultado<ListadoRegistrosMedicoDTO>> {
        throw new Error("Method not implemented.");
    }

}
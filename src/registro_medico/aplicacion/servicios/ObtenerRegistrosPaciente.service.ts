import { ILogger } from "../../../commun/aplicacion/puertos/ILogger";
import { IServicioAplicacion } from "../../../commun/aplicacion/IServicioAplicacion";
import { Resultado } from "../../../commun/aplicacion/Resultado";
import { ListadoRegistrosMedicoDTO } from "../dto/ListadoRegistrosMedicosDTO";
import { IRepositorioRegistroMedico } from "../puertos/IRepositorioRegistroMedico";
import { IExcepcion } from "../../../commun/dominio/excepcciones/IExcepcion";
import { DetalleRegistroMedicoPersistenciaDTO } from "../../../registro_medico/infraestructura/dto/DetalleRegistroMedicoPersistenciaDTO";
import { RegistroMedicoMapeador } from "../mapeador/RegistroMedicoMapeador";

export class ObtenerRegistrosPaciente implements IServicioAplicacion<string, ListadoRegistrosMedicoDTO[]>{
    constructor(
        private readonly logger: ILogger,
        private readonly repositorioRegistroMedico: IRepositorioRegistroMedico,
    ) {}

    async ejecutar(data: string): Promise<Resultado<ListadoRegistrosMedicoDTO[]>> {
        try {
            let registroPersistencia: DetalleRegistroMedicoPersistenciaDTO[] =  await this.repositorioRegistroMedico.ObtenerRegistrosMedicosByPaciente(data);
            
            const listadoRegistros: ListadoRegistrosMedicoDTO[] = registroPersistencia.map((datos) =>
                RegistroMedicoMapeador.convertirPersistenciaEnListadoRegistrosDTO(datos),
            )   
             this.logger.log("Busqueda de Registro Medico del Paciente: " + data, "Registros Encontrados: " + listadoRegistros.length);

            return Resultado.Exito<ListadoRegistrosMedicoDTO[]>(listadoRegistros); 

        } catch (error) {
            let errores: IExcepcion = error;
            this.logger.error("Error inesperado:", errores.mensaje);
            return Resultado.Falla(error); 
        }
    }

}
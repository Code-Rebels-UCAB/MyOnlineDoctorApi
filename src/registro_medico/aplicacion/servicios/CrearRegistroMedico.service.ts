import { IExcepcion } from "../../../commun/dominio/excepcciones/IExcepcion";
import { IServicioAplicacion } from "../../../commun/aplicacion/IServicioAplicacion";
import { ILogger } from "../../../commun/aplicacion/puertos/ILogger";
import { Resultado } from "../../../commun/aplicacion/Resultado";
import { IRepositorioRegistroMedico} from "../puertos/IRepositorioRegistroMedico";
import { CrearHistoriaMedica } from "../../../historia_medica/aplicacion/servicios/CrearHistoriaMedica.service";
import { RegistroMedicoDTO } from "../dto/RegistroMedicoDTO";
import { RegistroMedicoMapeador } from "../mapeador/RegistroMedicoMapeador";


export class CrearRegistroMedico implements IServicioAplicacion<RegistroMedicoDTO, void>{
    
    constructor(
        private readonly logger: ILogger,
        private readonly repositorioRegistroMedico: IRepositorioRegistroMedico,
        private readonly crearHistoria: CrearHistoriaMedica
        ) { }

    async ejecutar(datos: RegistroMedicoDTO): Promise<Resultado<void>> {
        try {

            //........AGREGADO DE REGISTRO MEDICO................
            var registroMedico = RegistroMedicoMapeador.convertirPersistenciaEnDominio(datos);

            //........EVENTOS DE DOMINIO................
            const eventos = registroMedico.obtenerEventos();
            registroMedico.limpiarEventos();
                
            //........COMPROBAR SI TIENE HISTORIA MEDICA................
            var historiaMedicaId = await this.repositorioRegistroMedico.ObtenerHistoriaMedicaAsociada(registroMedico.getCitaID().getCitaID().toString());
 
            //SE VERIFICA QUE TENGA EL REGISTRO MEDICO TENGA UN HISTORIA MEDICA CREADA, O SI ES EL PRIMER REGISTRO MEDICO DEL PACIENTE
            if (!historiaMedicaId) {
                var HistoriaCreada = await this.crearHistoria.ejecutar(await this.repositorioRegistroMedico.ObtenerPacienteAsociado(registroMedico.getCitaID().getCitaID().toString()));
                historiaMedicaId = HistoriaCreada.valor;
            }

            //........DELEGAR EN EL REPOSITORIO LA PERSISTENCIA DEL REGISTRO................
            const registroCreado = this.repositorioRegistroMedico.CrearRegistro({
                IdRegistroMedico: registroMedico.obtenerIdentificador().getRegistroMedicoID().toString(),
                IdCita: registroMedico.getCitaID().getCitaID().toString(),
                IdDoctor: registroMedico.getDoctorID().getDoctorID().toString(),
                examenes: registroMedico.getExamenes().getExamenes(),
                historia: registroMedico.getHistoria().getHistoria(),
                prescripcion: registroMedico.getPrescripccion().getPrescripcion(),
                plan: registroMedico.getPlan().getPlan(),
                diagnostico: registroMedico.getDiagnostico().getDiagnostico(),
                IdHistoriaMedica: historiaMedicaId
            });

            this.logger.log("Ha sido creado el Registro Medico ID:" + registroMedico.obtenerIdentificador().getRegistroMedicoID().toString() , '');
            return Resultado.Exito<void>(registroCreado);
        }
        catch (error) {
            let errores: IExcepcion = error;
            this.logger.error("Error inesperado:", errores.mensaje);
            return Resultado.Falla(error);
        }

    }
}
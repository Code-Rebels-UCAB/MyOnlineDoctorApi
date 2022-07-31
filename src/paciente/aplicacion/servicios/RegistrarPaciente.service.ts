import { IExcepcion } from "../../../commun/dominio/excepcciones/IExcepcion";
import { IServicioAplicacion } from "../../../commun/aplicacion/IServicioAplicacion";
import { ILogger } from "../../../commun/aplicacion/puertos/ILogger";
import { Resultado } from "../../../commun/aplicacion/Resultado";
import { RepositorioPaciente } from "../../../paciente/infraestructura/adaptadores/RepositorioPaciente";
import { PacienteMapeador } from "../mappeador/PacienteMapeador";
import { PacientePersistenciaDTO } from "../../../paciente/infraestructura/dto/PacientePersistenciaDTO";
import { Paciente } from "src/paciente/dominio/entidades/Paciente";
import { ManejadorEventos } from "src/commun/aplicacion/ManejadorEventos";


export class RegistrarPaciente implements IServicioAplicacion<PacientePersistenciaDTO,void> {

    constructor(
        private readonly logger: ILogger,
        private readonly repositorioPaciente: RepositorioPaciente,
        private readonly manejador: ManejadorEventos<any>
    ) {}

    async ejecutar(data: PacientePersistenciaDTO): Promise<Resultado<void>> {
        try{

            let pacienteVO = PacienteMapeador.covertirPersistenciaDominio(data);

            let paciente: Paciente =  Paciente.registrarPaciente(
                pacienteVO.getNombrePaciente(),
                pacienteVO.getCorreoPaciente(),
                pacienteVO.getPasswordPaciente(),
                pacienteVO.getGeneroPaciente(),
                pacienteVO.getNumeroTelefonico(),
                pacienteVO.getFechaNacimiento(),
                pacienteVO.getPeso(),
                pacienteVO.getAltura(),
                pacienteVO.getAlergia(),
                pacienteVO.getOperacion(),
                pacienteVO.getAntecedentes()

            );

            let evento = paciente.obtenerEventos();
            paciente.limpiarEventos();

            let pacienteNuevo = PacienteMapeador.covertirDominioPersistencia(paciente);
            console.log(pacienteNuevo);

            await this.repositorioPaciente.registrarPaciente(pacienteNuevo);

            this.logger.log('Se registro un nuevo paciente de id' + pacienteNuevo.idPaciente, '');

            this.manejador.AddEvento(...evento);
            this.manejador.Notify();
            
            return Resultado.Exito<void>(null);

        } catch(error) {
            const errores: IExcepcion = error;
            this.logger.error('Error inesperado: ', errores.mensaje);
            console.log(error)
            return Resultado.Falla(error);
        }
    }

}
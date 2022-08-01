import { IExcepcion } from "../../../commun/dominio/excepcciones/IExcepcion";
import { IServicioAplicacion } from "../../../commun/aplicacion/IServicioAplicacion";
import { ILogger } from "../../../commun/aplicacion/puertos/ILogger";
import { Resultado } from "../../../commun/aplicacion/Resultado";
import { PacienteMapeador } from "../mappeador/PacienteMapeador";
import { PacientePersistenciaDTO } from "../../../paciente/infraestructura/dto/PacientePersistenciaDTO";
import { Paciente } from "../../dominio/entidades/Paciente";
import { ManejadorEventos } from "../../../commun/aplicacion/ManejadorEventos";
import { IRepositorioPaciente } from "../puertos/IRepositorioPaciente";
import { IEncriptarContrasena } from "../puertos/IEncriptarContraseña";
import { Injectable } from "@nestjs/common";


export class RegistrarPaciente implements IServicioAplicacion<PacientePersistenciaDTO,void> {

    constructor(
        private readonly logger: ILogger,
        private readonly repositorioPaciente: IRepositorioPaciente,
        private readonly encriptarContrasena : IEncriptarContrasena,
        private readonly manejador: ManejadorEventos<any>,
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

            this.encriptarContrasena.encriptarContrasena(pacienteNuevo.password).then(res => pacienteNuevo.password = res);

            await this.repositorioPaciente.registrarPaciente(pacienteNuevo);

            this.logger.log('Se registro un nuevo paciente con identificador ' + pacienteNuevo.idPaciente, '');

            this.manejador.AddEvento(...evento);
            this.manejador.Notify();
            
            return Resultado.Exito<void>(null);

        } catch(error) {
            const errores: IExcepcion = error;
            this.logger.error('Error inesperado: ', errores.mensaje);
            return Resultado.Falla(error);
        }
    }

}
import { Guid } from "guid-typescript";
import { PacienteID } from "../../../commun/dominio/values/PacienteID";
import { Paciente } from "../../../paciente/dominio/entidades/Paciente";
import { Alergia } from "../../../paciente/dominio/values/Alergia";
import { Altura } from "../../../paciente/dominio/values/Altura";
import { Antecedentes } from "../../../paciente/dominio/values/Antecedentes";
import { CorreoPaciente } from "../../../paciente/dominio/values/CorreoPaciente";
import { FechaDeNacimiento } from "../../../paciente/dominio/values/FechaDenacimiento";
import { GeneroPaciente } from "../../../paciente/dominio/values/GeneroPaciente";
import { NombrePaciente } from "../../../paciente/dominio/values/NombrePaciente";
import { NumeroTelefonico } from "../../../paciente/dominio/values/NumeroTelefonico";
import { Operacion } from "../../../paciente/dominio/values/Operacion";
import { PasswordPaciente } from "../../../paciente/dominio/values/PasswordPaciente";
import { Peso } from "../../../paciente/dominio/values/Peso";
import { StatusSuscripcion } from "../../../paciente/dominio/values/StatusSuscripcion";
import { PacienteInfoPersistenciaDTO } from "../../../paciente/infraestructura/dto/PacienteInfoPersistenciaDTO";
import { PacientePersistenciaDTO } from "../../../paciente/infraestructura/dto/PacientePersistenciaDTO";
import { ConsultarPacienteRespuestaDTO } from "../dto/queries/ConsultarPaciente.query";
import { PacienteInfoDTO } from "../dto/queries/PacienteInfoDTO";


export class PacienteMapeador{
    public static covertirPersistenciaDominio(datos: PacientePersistenciaDTO):Paciente{
        return Paciente.crear(PacienteID.crear(Guid.parse(datos.id_paciente)), GeneroPaciente.crear(datos.sexo as any), Altura.crear(parseFloat(datos.altura)),
                        Peso.crear(parseFloat(datos.peso)), NumeroTelefonico.crear(datos.telefono), Antecedentes.crear(datos.antecedentes), Operacion.crear(datos.operacion), StatusSuscripcion.crear(datos.status_suscripcion as any),
                        Alergia.crear(datos.alergia as any),PasswordPaciente.crear(datos.contrasena), CorreoPaciente.crear(datos.correo), FechaDeNacimiento.crear(new Date(datos.fecha_nacimiento)), NombrePaciente.crear(datos.p_nombre, datos.s_nombre, datos.p_apellido, datos.s_apellido));
    }

    public static covertirDominioPersistencia(paciente: Paciente):ConsultarPacienteRespuestaDTO{

        return {
            idPaciente: paciente.getPacienteID().getPacienteID().toString(),
            primer_nombre: paciente.getNombrePaciente().getPrimerNombre(),
            segundo_nombre: paciente.getNombrePaciente().getSegundoNombre(),
            primer_apellido: paciente.getNombrePaciente().getPrimerApellido(),
            segundo_apellido: paciente.getNombrePaciente().getSegundoApellido(),
            fechaNacimiento: paciente.getFechaNacimiento().getFechaNacimiento(),
            telefono: paciente.getNumeroTelefonico().getNumeroTelefonicoValor().toString(),
            email: paciente.getCorreoPaciente().getCorreoPaciente().toString(),
            genero: paciente.getGeneroPaciente().getGeneroPacienteValor().toString(),
            altura: paciente.getAltura().getAlturaValor(),
            peso: paciente.getPeso().getPesoValor(),
            password: paciente.getPasswordPaciente().getPasswordPaciente().toString(),
            statusSuscripcion: paciente.getStatusSuscripccion().getStatusSuscripcion().toString(),
            alergia: paciente.getAlergia().getAlergia(),
            antecedentes: paciente.getAntecedentes().getAntecedentesValor(),
            operaciones: paciente.getOperacion().getOperacionValor(),
        }
    }

    public static ConvertirPersistenciaEnInfoPaciente(datos: PacienteInfoPersistenciaDTO):PacienteInfoDTO{
        return {
            id_paciente: datos.id_paciente,
            p_nombre: datos.p_nombre,
            s_nombre: datos.s_nombre,
            p_apellido: datos.p_apellido,
            s_apellido: datos.s_apellido,
            sexo: datos.sexo,
            altura: datos.altura,
            peso: datos.peso,
            telefono: datos.telefono,
            antecedentes: datos.antecedentes,
            operacion: datos.operacion,
            status_suscripcion: datos.status_suscripcion,
            alergia: datos.alergia,
            correo: datos.correo,
            fecha_nacimiento: datos.fecha_nacimiento,
        };
    }
}    
import { Guid } from "guid-typescript";
import { PacienteID } from "src/commun/dominio/values/PacienteID";
import { Paciente } from "src/paciente/dominio/entidades/Paciente";
import { Alergia } from "src/paciente/dominio/values/Alergia";
import { Altura } from "src/paciente/dominio/values/Altura";
import { Antecedentes } from "src/paciente/dominio/values/Antecedentes";
import { CorreoPaciente } from "src/paciente/dominio/values/CorreoPaciente";
import { FechaDeNacimiento } from "src/paciente/dominio/values/FechaDenacimiento";
import { GeneroPaciente } from "src/paciente/dominio/values/GeneroPaciente";
import { NombrePaciente } from "src/paciente/dominio/values/NombrePaciente";
import { NumeroTelefonico } from "src/paciente/dominio/values/NumeroTelefonico";
import { Operacion } from "src/paciente/dominio/values/Operacion";
import { PasswordPaciente } from "src/paciente/dominio/values/PasswordPaciente";
import { Peso } from "src/paciente/dominio/values/Peso";
import { StatusSuscripcion } from "src/paciente/dominio/values/StatusSuscripcion";
import { PacientePersistenciaDTO } from "src/paciente/infraestructura/dto/PacientePersistenciaDTO";
import { ConsultarPacienteRespuestaDTO } from "../dto/queries/ConsultarPaciente.query";


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
}    
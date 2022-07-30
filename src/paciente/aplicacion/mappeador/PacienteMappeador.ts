import { PacienteInfoPersistenciaDTO } from "../../../paciente/infraestructura/dto/PacienteInfoPersistenciaDTO";
import { ConsultarPacienteQueryDTO } from "../dto/queries/ConsultarPaciente.query";
import { PacienteInfoDTO } from "../dto/queries/PacienteInfoDTO";



export class PacienteMapeador{

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
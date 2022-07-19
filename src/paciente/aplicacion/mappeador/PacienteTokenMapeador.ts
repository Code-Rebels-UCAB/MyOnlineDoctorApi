import { TokenPacienteDTO } from "../dto/TokenPacienteDTO";
import { TokenPacientePersistenciaDTO } from "src/paciente/infraestructura/dto/TokenPacientePersistenciaDTO";


export class PacienteTokenMapeador{

    public static convertirAplicacionInfraestructura(datos: TokenPacienteDTO):TokenPacientePersistenciaDTO{
 
        return {
            id_paciente: datos.idPaciente,
            token_Firebase: datos.tokenF,
        }
    }
}

import { Guid } from "guid-typescript";
import { RegistroMedicoID } from "../../../commun/dominio/values/RegistroMedicoID";
import { CitaID } from "../../../commun/dominio/values/CitaID";
import { DoctorID } from "../../../commun/dominio/values/DoctorID";
import { RegistroMedico } from "../../../registro_medico/dominio/entidades/RegistroMedico";
import { Diagnostico } from "../../../registro_medico/dominio/values/Diagnostico";
import { Examenes } from "../../../registro_medico/dominio/values/Examenes";
import { Historia } from "../../../registro_medico/dominio/values/Historia";
import { Plan } from "../../../registro_medico/dominio/values/Plan";
import { Prescripcion } from "../../../registro_medico/dominio/values/Prescripcion";
import { RegistroMedicoRespuestaDTO } from "../../aplicacion/dto/RegistroMedicoRespuestaDTO";
import { RegistroMedicoDTO } from "../dto/RegistroMedicoDTO";
import { DetalleRegistroMedicoPersistenciaDTO } from "../../../registro_medico/infraestructura/dto/DetalleRegistroMedicoPersistenciaDTO";
import { ListadoRegistrosMedicoDTO } from "../dto/ListadoRegistrosMedicosDTO";

export class RegistroMedicoMapeador {

    static convertirDominioEnPersistencia(entrada: RegistroMedico): RegistroMedicoRespuestaDTO {
        return {
            id_registro: entrada.obtenerIdentificador().getRegistroMedicoID().toString(),
            id_cita: entrada.getCitaID().getCitaID().toString(),
            examenes: entrada.getExamenes().getExamenes().toString(),
            historia: entrada.getHistoria().getHistoria().toString(),
            prescripcion: entrada.getPrescripccion().getPrescripcion().toString(),
            plan: entrada.getPlan().getPlan().toString(),
            diagnostico: entrada.getDiagnostico().getDiagnostico().toString(),
            id_doctor: entrada.getDoctorID().getDoctorID().toString(),
        }
    }
    
    static convertirPersistenciaEnDominio(entrada: RegistroMedicoDTO): RegistroMedico {
        return RegistroMedico.crearRegistroMedico( 
          Examenes.crear(entrada.examenes),
          Historia.crear(entrada.historia),
          Prescripcion.crear(entrada.prescripcion),
          Plan.crear(entrada.plan),
          Diagnostico.crear(entrada.diagnostico),
          DoctorID.crear(Guid.parse(entrada.IdDoctor)),
          CitaID.crear(Guid.parse(entrada.IdCita)),
        );
    }

    static actualizarEnDominio(entrada:RegistroMedicoDTO ): RegistroMedico {
        return new RegistroMedico(
            RegistroMedicoID.crear(Guid.parse(entrada.IdRegistroMedico)),
            DoctorID.crear(Guid.parse(entrada.IdDoctor)),
            CitaID.crear(Guid.parse(entrada.IdCita)),
            Examenes.crear(entrada.examenes),
            Historia.crear(entrada.historia),
            Prescripcion.crear(entrada.prescripcion),
            Plan.crear(entrada.plan),
            Diagnostico.crear(entrada.diagnostico)
        );
    }

    static convertirPersistenciaEnListadoRegistrosDTO(entrada: DetalleRegistroMedicoPersistenciaDTO ): ListadoRegistrosMedicoDTO{ 
        return {
            id_registro: entrada.id_registro,
            examenes: entrada.examenes,
            historia: entrada.historia,
            prescripcion: entrada.prescripcion,
            plan: entrada.plan,
            diagnostico: entrada.diagonistico,
            motivo: entrada.motivo,
            fechaCita: entrada.fechaCita,
            modalidad: entrada.cita.modalidad,
            id_doctor: entrada.doctor.id_doctor,
            nombreDoctor: entrada.doctor.p_nombre + " " + entrada.doctor.p_apellido,
            sexoDoctor: entrada.doctor.sexo,
            id_cita: entrada.cita.id_cita,
            id_paciente: entrada.historiaMedica.paciente.id_paciente,
            id_historia: entrada.historiaMedica.id_historia,
        }
    }
}


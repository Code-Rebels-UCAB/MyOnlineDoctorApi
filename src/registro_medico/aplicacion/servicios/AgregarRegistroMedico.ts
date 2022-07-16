import { Imapeador } from "src/commun/aplicacion/Imapeador";
import { IServicioAplicacion } from "src/commun/aplicacion/IServicioAplicacion";
import { Resultado } from "src/commun/aplicacion/Resultado";
import { RegistroMedico } from "src/registro_medico/dominio/entidades/RegistroMedico";
import { RegistroMedicoMapeador } from "../mapeador/RegistroMedicoMapeador";
import { RegistroMedicoDataDTO } from "../dto/RegistroMedicoDataDTO";
import { IRepositorioRegistroMedico } from "../puertos/IRepositoryRegistroMedico";
import { DatosRegistroMedicoVO } from "src/registro_medico/dominio/dto/DatosRegistroMedicoVO";


export class AgregarRegistroMedico implements IServicioAplicacion<RegistroMedicoDataDTO, void>{
    
    constructor(private readonly _repositorioRegistroMedico: IRepositorioRegistroMedico) { }

    async ejecutar(comando: RegistroMedicoDataDTO): Promise<Resultado<void>> {
        try {
            const mapeadorRegistro = new RegistroMedicoMapeador();
            
            const datosRegistroMedico:DatosRegistroMedicoVO = mapeadorRegistro.convertirPersistenciaEnDominio(comando);

            const registroMedico: RegistroMedico = RegistroMedico.crearRegistroMedico(
                datosRegistroMedico.examenes,
                datosRegistroMedico.historia,
                datosRegistroMedico.prescripcion,
                datosRegistroMedico.plan,
                datosRegistroMedico.diagnostico,
                datosRegistroMedico.idDoctor,
                datosRegistroMedico.idCita,
                );
            
            

            
        } catch (error) {
            return Resultado.Falla(error);
        }

    }
}
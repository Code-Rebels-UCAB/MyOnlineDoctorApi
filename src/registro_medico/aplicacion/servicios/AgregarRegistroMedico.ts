import { Imapeador } from "src/commun/aplicacion/Imapeador";
import { IServicioAplicacion } from "src/commun/aplicacion/IServicioAplicacion";
import { Resultado } from "src/commun/aplicacion/Resultado";
import { RegistroMedico } from "src/registro_medico/dominio/entidades/RegistroMedico";
import { AgregarRegistroMedicoComandoDTO } from "../dto/comandos/AgregarRegistroMedico.comando";
import { RegistroMedicoMapeador } from "../mapeador/RegistroMedicoMapeador";
import { IRepositorioRegistroMedico, RegistroMedicoPersistenciaDTO } from "../puertos/IRepositoryRegistroMedico";


export class AgregarRegistroMedico implements IServicioAplicacion<RegistroMedicoPersistenciaDTO, void>{
    
    constructor(private readonly _repositorioRegistroMedico: IRepositorioRegistroMedico) { }

    async ejecutar(comando: RegistroMedicoPersistenciaDTO): Promise<Resultado<void>> {
        try {
            const mapeadorRegistro = new RegistroMedicoMapeador();
            const registroMedico:RegistroMedico = mapeadorRegistro.convertirPersistenciaEnDominio(comando);

            
        } catch (error) {
            return Resultado.Falla(error);
        }

    }
}
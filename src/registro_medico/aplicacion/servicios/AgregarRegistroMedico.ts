import { IServicioAplicacion } from "src/commun/aplicacion/IServicioAplicacion";
import { Resultado } from "src/commun/aplicacion/Resultado";
import { AgregarRegistroMedicoComandoDTO } from "../dto/comandos/AgregarRegistroMedico.comando";
import { IRepositorioRegistroMedico } from "../puertos/IRepositoryRegistroMedico";


export class AgregarRegistroMedico implements IServicioAplicacion<AgregarRegistroMedicoComandoDTO, void>{
    
    constructor(private readonly _repositorioRegistroMedico: IRepositorioRegistroMedico) { }

    // async ejecutar(comando: AgregarRegistroMedicoComandoDTO): Promise<Resultado<void>> {
        
    // }
}
import { Imapeador } from "src/commun/aplicacion/Imapeador";
import { IServicioAplicacion } from "src/commun/aplicacion/IServicioAplicacion";
import { Resultado } from "src/commun/aplicacion/Resultado";
import { RegistroMedico } from "src/registro_medico/dominio/entidades/RegistroMedico";
import { RegistroMedicoMapeador } from "../mapeador/RegistroMedicoMapeador";
import { RegistroMedicoDataDTO } from "../dto/RegistroMedicoDataDTO";
import { IRepositorioRegistroMedico } from "../puertos/IRepositoryRegistroMedico";
import { DatosRegistroMedicoVO } from "src/registro_medico/dominio/dto/DatosRegistroMedicoVO";
import { EventoDominio } from "src/commun/dominio/eventos/Evento";


export class AgregarRegistroMedico implements IServicioAplicacion<RegistroMedicoDataDTO, void>{
    
    constructor(private readonly _repositorioRegistroMedico: IRepositorioRegistroMedico) { }

    async ejecutar(comando: RegistroMedicoDataDTO): Promise<Resultado<void>> {
        try {
            const mapeadorRegistro = new RegistroMedicoMapeador();
            
            const datosRegistroMedico:DatosRegistroMedicoVO = mapeadorRegistro.convertirSalidaEnEntrada(comando);

            const registroMedico: RegistroMedico = RegistroMedico.crearRegistroMedico(
                datosRegistroMedico.examenes,
                datosRegistroMedico.historia,
                datosRegistroMedico.prescripcion,
                datosRegistroMedico.plan,
                datosRegistroMedico.diagnostico,
                datosRegistroMedico.idDoctor,
                datosRegistroMedico.idCita,
                );

            
            const eventos:EventoDominio[] = registroMedico.obtenerEventos()
            
            await this._repositorioRegistroMedico.crear(mapeadorRegistro.convertirEntradaEnSalida(datosRegistroMedico));

            return Resultado.Exito<void>();
        } catch (error) {
            return Resultado.Falla(error);
        }

    }
}
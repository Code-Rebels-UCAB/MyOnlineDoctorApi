
import { InjectRepository } from "@nestjs/typeorm";
import { RegistroMedicoDataDTO } from "src/registro_medico/aplicacion/dto/RegistroMedicoDataDTO";
import { IRepositorioRegistroMedico } from "src/registro_medico/aplicacion/puertos/IRepositoryRegistroMedico";
import { Repository } from "typeorm";
import { RegistroMedicoORM } from "../persistencia/RegistroMedico.orm";



export class RepositorioRegistroMedico implements IRepositorioRegistroMedico {
    
    constructor(@InjectRepository(RegistroMedicoORM) private readonly repositoryRegisroMedico: Repository<RegistroMedicoORM>) { }


    async crear(registroMedico: RegistroMedicoDataDTO): Promise<void> {
        try {
           const registro = this.repositoryRegisroMedico;
           //const cita = this.respositoryCita
           const citabuscada =  //cita.find(registroMedico.idCita);
           registro.insert({
            id_registro: registroMedico.idRegistroMedico,
            examenes: registroMedico.examenes,
            historia: registroMedico.historia,
            prescripcion: registroMedico.prescripcion,
            plan: registroMedico.plan,
            diagonistico: registroMedico.diagnostico,
            //motivo: citabuscada.motivo,

           })
        } catch (error) {}
    }

    async obtener(id: string): Promise<RegistroMedicoDataDTO> {
        try {
            const registro = this.repositoryRegisroMedico;
            const registroMedico = await registro.findOne({
                where: {
                    id_registro: id
                }
            }); 
            return ;       
        } catch (error) {}

    }
}
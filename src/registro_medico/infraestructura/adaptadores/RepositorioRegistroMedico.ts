import { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IRepositorioRegistroMedico } from 'src/registro_medico/aplicacion/puertos/IRepositorioRegistroMedico';
import { CrearRegistroMedicoDTO } from 'src/registro_medico/aplicacion/dto/CrearRegistroMedicoDTO';
import { RegistroMedicoORM } from '../persistencia/RegistroMedico.orm';



@Injectable()
export class RepositorioRegistroMedico implements IRepositorioRegistroMedico {

    constructor(
        @InjectRepository(RegistroMedicoORM)
        private readonly registroMedicoRepository: Repository<RegistroMedicoORM>
    ) { }


    CrearRegistro(datos: CrearRegistroMedicoDTO) {
        throw new Error('Method not implemented.');
    }

  
    
}

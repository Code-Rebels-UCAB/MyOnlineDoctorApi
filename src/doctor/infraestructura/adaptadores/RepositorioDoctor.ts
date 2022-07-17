import { IRepositorioDoctor } from '../../aplicacion/puertos/IRepositorioDoctor';
import { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DoctorORM } from '../persistencia/Doctor.orm';


@Injectable()
export class RepositorioDoctor implements IRepositorioDoctor {

    constructor(
        @InjectRepository(DoctorORM)
        private readonly _doctorRepository: Repository<DoctorORM>
    ) { }
    

    async obtenerDoctorByEspecialidad(especialidad: string): Promise<DoctorORM[]> {
        if(especialidad !=null || especialidad != undefined){
            especialidad = especialidad.toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
        }else{
            especialidad = '';
        }

        const doctoresFiltrados =  await this._doctorRepository.createQueryBuilder('doctores')
                                        .leftJoin('doctores.especialidades', 'especialidades')
                                        .leftJoinAndSelect('doctores.especialidades', 'EspecialidadesSelect')
                                        .where('especialidades.nombre like :especialidad', { especialidad: `%${especialidad}%`})
                                        .orderBy('doctores.id_doctor', 'ASC')
                                        .getMany();

        
        return doctoresFiltrados;
    }
    
    async obtenerDoctorByNombreorApellido(nombre: string): Promise<DoctorORM[]> {
        if(nombre !=null || nombre != undefined){
            nombre = nombre.toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
        }else{
            nombre = '';
        }

        const doctoresFiltrados =  await this._doctorRepository.createQueryBuilder('doctores')

        return 
    } 


    obtenerTopDoctores() {
        throw new Error('Method not implemented.');
    }

    
    bloquearDoctor(id: string) {
        throw new Error('Method not implemented.');
    }


    calificarDoctor(id: string, calificacion: number) {
        throw new Error('Method not implemented.');
    }
  
}

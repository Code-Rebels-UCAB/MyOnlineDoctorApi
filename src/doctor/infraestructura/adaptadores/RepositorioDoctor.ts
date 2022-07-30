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
                                                               .leftJoinAndSelect('doctores.especialidades', 'EspecialidadesSelect')
                                                               .where("(doctores.p_nombre ||' '|| doctores.p_apellido) like :nombre", { nombre: `%${nombre}%`})
                                                               .getMany(); 


        return doctoresFiltrados;
    } 


    async obtenerTopDoctores() {

        const doctoresFiltrados =  await this._doctorRepository.createQueryBuilder('doctores')
                                        .leftJoinAndSelect('doctores.especialidades', 'EspecialidadesSelect')
                                        .orderBy('doctores.calificacion', 'DESC')
                                        .getMany();

        
        return doctoresFiltrados;

    }

    async obtenerDoctorById(id: string): Promise<DoctorORM> {
        const doctor:DoctorORM = await this._doctorRepository.findOne({
            where: { id_doctor: id },
        });
        return doctor;
    }


    async bloquearDoctor(id: string) {
        await this._doctorRepository.update({
            id_doctor: id
        }, {
            status:'Bloqueado'
        });
    }


    async calificarDoctor(id: string, calificacion: number, cantidad: number):Promise<void> {
        await this._doctorRepository.update({
            id_doctor: id
        }, {
            calificacion: calificacion,
            cantidad_calificacion: cantidad
        });
    }
  
    async obtenerTodosDoctores(): Promise<DoctorORM[]> {
        const doctores = await this._doctorRepository.find();
        return doctores;
    }

    async obtenerDatosDoctor(id: string){
        const doctor =  await this._doctorRepository.createQueryBuilder('doctores')
        .select([
            'doctores.p_nombre', 
            'doctores.p_apellido',
            'doctores.sexo',
            'doctores.foto',
            'doctores.calificacion',
          ])
        .leftJoinAndSelect('doctores.especialidades', 'especialidades')
        .where('doctores.id_doctor = :doctorid', { doctorid: id})
        .getOne();
        return doctor;

    }
}

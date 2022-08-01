import { IPolitica } from "../../../commun/aplicacion/puertos/IPolitica";
import { Resultado } from "../../../commun/aplicacion/Resultado";
import { EventoDominio } from "../../../commun/dominio/eventos/Evento";
import * as admin from "firebase-admin";
import { ServiceAccount } from "firebase-admin";
import * as serviceAccount from "../../../serviceAccount.json";
//import { CitaPersistenciaIniciadaDTO } from "../dto/CitaPersistenciaIniciadaDTO";
import { DoctorPersistenciaIniciadaDTO } from "../../../doctor/infraestructura/dtos/DoctorPersistenciaIniciadaDTO"
import { IRepositorioDoctor } from "src/doctor/aplicacion/puertos/IRepositorioDoctor";
import { ILogger } from "../../../commun/aplicacion/puertos/ILogger";
import { IRepositorioRegistroMedico } from "src/registro_medico/aplicacion/puertos/IRepositorioRegistroMedico";
import { IRepositorioCita } from "src/cita/aplicacion/puertos/IRepositorioCita";

const serviceAccountVar = {
  projectId: serviceAccount.project_id,
  clientEmail: serviceAccount.client_email,
  privateKey: serviceAccount.private_key,
};


export class NotificarRegistroMedicoCreado implements IPolitica<string,void>{
    public constructor(
        private readonly repositorioRegistro: IRepositorioRegistroMedico,
        private readonly repositorioDoctor: IRepositorioDoctor,
        private readonly repositorioCita: IRepositorioCita,
        private readonly logger: ILogger,
    ) {}

    Update(context: EventoDominio, data: string): void {
        if (context.Nombre == 'RegistroMedicoCreado') {
            this.ejecutar(data);
        }
    }

    async ejecutar(data: string): Promise<Resultado<void>> {

      if (!admin.apps.length) {
        admin.initializeApp({
          credential: admin.credential.cert(serviceAccountVar as ServiceAccount),
        });
     }else {
      admin.app(); // if already initialized, use that one
     }

        const citaT: string = await this.repositorioRegistro.ObtenerCitaAsociada(data); 
        const doctorID: string = await this.repositorioCita.obtenerDoctorCita(citaT)
        const doctorT : any = await this.repositorioDoctor.obtenerDoctorNoti(doctorID);
        const tokenf: string = await this.repositorioCita.obtenerTokenF(citaT);
        const gender = doctorT.sexo;
        if(gender == 'M'){
          var gender2 = 'El Dr'
        }
        else{
          var gender2 = 'La Dra'
        }
        const payload = {
          notification: {
            title: 'Registro medico creado',
            body: `${gender2} ${doctorT.p_apellido} te creo un nuevo registro medico`,
            image: 'https://pbs.twimg.com/media/FY3c_ZXWQAArjd1?format=png&name=small'
          },
          data:{ 
            info: `Title:doctor registra historia medica, test`,
          }
        };
        Promise.all([await admin.messaging().sendToDevice(tokenf, payload)]);
        this.logger.log('Notificación del registro creado','');


      return null;  

    }
}
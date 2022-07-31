import { IPolitica } from "../../../commun/aplicacion/puertos/IPolitica";
import { Resultado } from "../../../commun/aplicacion/Resultado";
import { EventoDominio } from "../../../commun/dominio/eventos/Evento";
import * as admin from "firebase-admin";
import { ServiceAccount } from "firebase-admin";
import * as serviceAccount from "../../../serviceAccount.json";
import { IRepositorioCita } from '../../aplicacion/puertos/IRepositorioCita';
import { CitaPersistenciaIniciadaDTO } from "../dto/CitaPersistenciaIniciadaDTO";
import { DoctorPersistenciaIniciadaDTO } from "../../../doctor/infraestructura/dtos/DoctorPersistenciaIniciadaDTO"
import { IRepositorioDoctor } from "src/doctor/aplicacion/puertos/IRepositorioDoctor";
import { ILogger } from "../../../commun/aplicacion/puertos/ILogger";

const serviceAccountVar = {
  projectId: serviceAccount.project_id,
  clientEmail: serviceAccount.client_email,
  privateKey: serviceAccount.private_key,
};


export class NotificarCitaSuspendidaFirebase implements IPolitica<string,void>{
    public constructor(
        private readonly repositorioCita: IRepositorioCita,
        private readonly repositorioDoctor: IRepositorioDoctor,
        private readonly logger: ILogger,
    ) {}

    Update(context: EventoDominio, data: string): void {
        if (context.Nombre == 'CitaSuspendida') {
            this.ejecutar(data)
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

        const citaT: any = await this.repositorioCita.obtenerCitaById(data);
        const doctorID: string = await this.repositorioCita.obtenerDoctorCita(data)
        const doctorT : any = await this.repositorioDoctor.obtenerDoctorNoti(doctorID);
        const tokenf: string = await this.repositorioCita.obtenerTokenF(data);
        const gender = doctorT.sexo;
        if(gender == 'M'){
          var gender2 = 'El Dr'
        }
        else{
          var gender2 = 'La Dra'
        }
        const payload = {
          notification: {
            title: 'Cita Suspendida',
            body: `${gender2} ${doctorT.p_apellido} te suspendio la cita del ${citaT.fechacita} a las ${citaT.horacita}`,
            image: 'https://pbs.twimg.com/media/FY3c_ZXWQAArjd1?format=png&name=small'
          },
          data:{ 
            info: `Title:doctor suspende cita, test`,
          }
        };
        Promise.all([await admin.messaging().sendToDevice(tokenf, payload)]);
        this.logger.log('Notificación de la cita agendada enviada','');


      return null;  

    }
}
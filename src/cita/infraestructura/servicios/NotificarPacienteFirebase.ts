import { IPolitica } from "../../../commun/aplicacion/puertos/IPolitica";
import { Resultado } from "../../../commun/aplicacion/Resultado";
import { EventoDominio } from "../../../commun/dominio/eventos/Evento";
import * as admin from "firebase-admin";
import { ServiceAccount } from "firebase-admin";
import * as serviceAccount from "../../../serviceAccount.json";
import { IRepositorioCita } from '../../aplicacion/puertos/IRepositorioCita';
import { CitaPersistenciaIniciadaDTO } from "../dto/CitaPersistenciaIniciadaDTO";

const serviceAccountVar = {
  projectId: serviceAccount.project_id,
  clientEmail: serviceAccount.client_email,
  privateKey: serviceAccount.private_key,
};


export class NotificarPacienteFirebase implements IPolitica<string,void>{
    public constructor(
        private readonly repositorioCita: IRepositorioCita,
    ) {}

    Update(context: EventoDominio, data: string): void {
        if (context.Nombre == 'CitaIniciada') {
            this.notificarCitaIniciada(data)
        }
    }

    ejecutar(data: string): Promise<Resultado<void>> {
        console.log(data);
        //LOGICA DE NOTIFICAR PACIENTE LLAMADA
        return null;

    }

    async notificarCitaIniciada(data: string): Promise<Resultado<void>> {
        console.log(serviceAccount);
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccountVar as ServiceAccount),
          });
          
          const citaT: CitaPersistenciaIniciadaDTO = await this.repositorioCita.obtenerCitaIniciada(data);
          const tokenf: string = await this.repositorioCita.obtenerTokenF(data);
          const payload = {
            notification: {
              title: 'llamada entrante',
              body: `Nombre del canal: ${citaT.channelA}, Token: ${citaT.tokenA}`,
            },
          };
          Promise.all([await admin.messaging().sendToDevice(tokenf, payload)]);
          console.log('Notificación enviada');


        return null;
    }

}

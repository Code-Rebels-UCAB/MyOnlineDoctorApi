import { Injectable } from "@nestjs/common";
import { RtcRole, RtcTokenBuilder } from "agora-access-token";
import { IVideollamadaCita } from "src/cita/aplicacion/puertos/IVideollamaCita";

@Injectable()
export class VideollamadaCita implements IVideollamadaCita {

    public constructor() {}

    generarTokenVideollamada(nombreCanal: string) : string{
        const appID = '4fd40aec2b9b45028114e370f7c07501';
        const appCertificate = '7e07ed8c266142688a404d8ac5832679';

        const uid : number = 0;
        const rol : number = RtcRole.PUBLISHER

        const expireTime = 7200;
        const currentTime = Math.floor(Date.now() / 1000);
        const privilegeExpiredTs = currentTime + expireTime;

        const token = RtcTokenBuilder.buildTokenWithUid(
            appID,
            appCertificate,
            nombreCanal,
            uid,
            rol,
            privilegeExpiredTs,
          );

        return token;
    }

}
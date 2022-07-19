import { CitaID } from "src/commun/dominio/values/CitaID";
import { FechaCita } from "../values/FechaCita";
import { HoraCita } from "../values/HoraCita";
import { Duracion } from "../values/Duracion";

export interface AgendarCitaDataVO {
    idCita: CitaID,
    fechaCita: FechaCita,
    horaCita: HoraCita,
    duracion: Duracion,
}
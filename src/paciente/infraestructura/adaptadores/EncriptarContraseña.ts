import { IEncriptarContrasena } from "../../aplicacion/puertos/IEncriptarContraseña";
import * as bcrypt from 'bcrypt';
import { Injectable } from "@nestjs/common";

@Injectable()
export class EncriptarContrasena implements IEncriptarContrasena{

    constructor(){}

    async encriptarContrasena(contrasena: string): Promise<string> {
        const salt = await bcrypt.genSalt(); 
        const contrasenaEncriptada = await bcrypt.hash(contrasena, salt);
        return contrasenaEncriptada;
    }

    async chequearContrasena (contrasenaDada : string, contrasenaGuardada: string) : Promise<boolean> {
        const contrasenaChequeada = await bcrypt.compare(contrasenaDada, contrasenaGuardada);
        return contrasenaChequeada;
    }

}
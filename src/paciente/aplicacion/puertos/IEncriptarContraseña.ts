
export interface IEncriptarContrasena {

    encriptarContrasena(contrasena: string) : Promise<string>;
    chequearContrasena(passwordPaciente: string, contrasena: string): Promise<boolean>;
}

export const IEncriptarContrasena = Symbol("IEncriptarContrasena");

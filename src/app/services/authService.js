import LocalStorageService from "./localStorageService";

export const USUARIO_LOGADO = '_usuario_logado'

export default class AuthService {

    static isUsuarioAutenticado() {
        const usuario = LocalStorageService.obterItem(USUARIO_LOGADO);
        console.log("Usuario Autenticado (AuthService):", usuario);
        return usuario && usuario.id;
    }



    static removerUsuarioAutenticado() {
        LocalStorageService.removerItem(USUARIO_LOGADO)
    }

    static logar(usuario) {
        console.log("Logando usuário (AuthService):", usuario);
        LocalStorageService.addItem(USUARIO_LOGADO, usuario)
    }

    static obterUsuarioAutenticado() {
        return LocalStorageService.obterItem(USUARIO_LOGADO);
    }

}
const local = "_LOCAL_SESSION_";
import jwt_token from "jwt-decode";

export default {
  _setSessionFromToken(token) {
    let dados = jwt_token(token);
    let session = {
      token: token,
      cpf: dados.cpf,
      nome: dados.nome,
      email: dados.email,
      situacao: dados.situacao,
      administrador: dados.administrador,
      grupo: dados.grupo,
      nomeGrupo: dados.nomeGrupo,
      permissoes: dados.role,
      idEmpresa: dados.idEmpresa,
      idFilial: dados.idFilial
    };
    sessionStorage.setItem(local, JSON.stringify(session));
  },
  _removeSession() {
    if (sessionStorage.getItem(local) != null) {
      sessionStorage.removeItem(local);
    }
  },

  _getSession(posicao) {
    if (sessionStorage.getItem(local) != null) {
      let sessao = JSON.parse(sessionStorage.getItem(local));
      return posicao != null && posicao != "" ? sessao[posicao] : sessao;
    } else return null;
  }
};

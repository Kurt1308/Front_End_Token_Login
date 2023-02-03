import { assert } from "../../core/index";
import { BaseService } from "../base/baseService";
import { ErrorWrapper, ResponseWrapper } from "../base/util";

export class TransacoesService extends BaseService {
  static get entity() {
    return window.$config.api_transacao;
  }
   static async addTransacao(params = {}) {
    assert.object(params, { required: true });
    console.log(params)
    alert("chegou service", params)
    try {
      const response = await this.request({ auth: true }, this.entity).post(
        'InserirTransacao',
        params
      );
      return new ResponseWrapper(
        response,
        response.data,
        response.data.mensagem
      );
    } catch (error) {
      if (error.response) {
        return new ResponseWrapper(
          error.response,
          error.response.data,
          error.response.data.mensagem
        );
      } else {
        throw new ErrorWrapper(error, window.$config.mensagemPadraoErro);
      }
    }
  }
  static async getTransacoes() {
    try {
      const response = await this.request({ auth: true }, this.entity).get(
        `GetTodasAsTransacoes`
      );
      return new ResponseWrapper(
        response,
        response.data,
        response.data.mensagem
      );
    } catch (error) {
      if (error.response) {
        return new ResponseWrapper(
          error.response,
          error.response.data,
          error.response.data.mensagem
        );
      } else {
        throw new ErrorWrapper(error, window.$config.mensagemPadraoErro);
      }
    }
  }
}

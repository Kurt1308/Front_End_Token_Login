import { assert } from "../../core/index";
import { BaseService } from "../base/baseService";
import { ErrorWrapper, ResponseWrapper } from "../base/util";

export class ContasService extends BaseService {
  static get entity() {
    return window.$config.api_conta;
  }
  static async getContas() {
    try {
      const response = await this.request({ auth: true }, this.entity).get(
        `CRUDConta/GetTodasAsContas`
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

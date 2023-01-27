import { assert } from "../../core/index";
import { BaseService } from "../base/baseService";
import { ErrorWrapper, ResponseWrapper } from "../base/util";

export class LoginService extends BaseService {
  static get entity() {
    return window.$config.api_login;
  }
  static async loginAutenticacao(params = {}) {
    assert.object(params, { required: true });
    try {
      const response = await this.request({ auth: false }, this.entity).post(
        `login`,
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
}

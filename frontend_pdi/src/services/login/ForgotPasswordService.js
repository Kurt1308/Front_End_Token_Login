import { assert } from "../../core/index";
import { BaseService } from "../base/baseService";
import { ErrorWrapper, ResponseWrapper } from "../base/util";

export class ForgotPasswordService extends BaseService {
  static get entity() {
    return window.$config.seguranca + "/ForgotPassword";
  }
  static async getUsuariosByFiltro(params = {}) {
    assert.object(params, { required: true });
    try {
      const response = await this.request({ auth: false }, this.entity).post(
        `GetByFiltro`,
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
  static async putUsuario(params = {}) {
    assert.object(params, { required: true });
    try {
      const response = await this.request({ auth: false }, this.entity).put(
        `UpdateUsuario`,
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

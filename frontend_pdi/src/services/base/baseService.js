import { assert } from '../../core/index'
import { ResponseWrapper, ErrorWrapper } from './util'
import { Http } from './httpInit'

export class BaseService {
  static get entity () {
    throw new Error('entity getter not defined')
  }
  /**
   * ------------------------------
   * @HELPERS
   * ------------------------------
   */
   static request (status = { auth: false }, url) {
    return new Http(status, url)
  }

  static responseWrapper (...rest) {
    return new ResponseWrapper(...rest)
  }

  static errorWrapper (...rest) {
    return new ErrorWrapper(...rest)
  }

  /**
   * TODO: No Parcerias estes helpers foram descartados. Avaliar descarte no Core também.
   * ------------------------------
   * @API_CALLS_PUBLIC
   * ------------------------------
   */

  static async get (parameters = {}) {
    assert.object(parameters)

    const params = { ...parameters }

    try {
      const response = await this.request({auth: false},this.entity).get(`${this.entity}`, { params })
      const data = {
        content: response.data.data,
        total: Number(response.headers['x-total-count'])
      }

      return new ResponseWrapper(response, data)
    } catch (error) {
      const message = error.response.data ? error.response.data.error : error.response.statusText
      throw new ErrorWrapper(error, message)
    }
  }

  static async getByIdPublic (id) {
    assert.id(id, { required: true })

    try {
      const response = await this.request({auth: false},this.entity).get(`${this.entity}/${id}`)
      return new ResponseWrapper(response, response.data.data)
    } catch (error) {
      const message = error.response.data ? error.response.data.error : error.response.statusText
      throw new ErrorWrapper(error, message)
    }
  }

  /**
   * ------------------------------
   * @API_CALLS_PRIVATE
   * ------------------------------
   */
  static async getById (id) {
    assert.id(id, { required: true })

    try {
      const response = await this.request({auth: false},this.entity).get(`${this.entity}/${id}`)
      return new ResponseWrapper(response, response.data.data)
    } catch (error) {
      const message = error.response.data ? error.response.data.error : error.response.statusText
      throw new ErrorWrapper(error, message)
    }
  }

  static async create (data = {}) {
    assert.object(data, { required: true })

    try {
      const response = await this.request({auth: false},this.entity).post(`${this.entity}`, data)
      return new ResponseWrapper(response, response.data.data)
    } catch (error) {
      throw new ErrorWrapper(error)
    }
  }
}

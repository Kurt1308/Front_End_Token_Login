import axios from 'axios'

import { Http } from './httpInit'
import { ResponseWrapper, ErrorWrapper } from './util'

let BEARER = ''

export class AuthService {
 
  /**
   ******************************
   * @METHODS
   ******************************
   */

  static isAccessTokenExpired () {
    // window.$sessao._getSession('token')
    const accessTokenExpDate = $store.state.auth.accessTokenExpDate - 10
    const nowTime = Math.floor(new Date().getTime() / 1000)

    return accessTokenExpDate <= nowTime
  }

  static hasRefreshToken () {
    return Boolean(localStorage.getItem('refreshToken'))
  }

  static setRefreshToken (status) {
    if (!['', 'true'].includes(status)) {
      throw new Error(`setRefreshToken: invalid value ${status}; Expect one of ['', 'true']`)
    }

    localStorage.setItem('refreshToken', status)
  }

  static getBearer () {
    return BEARER
  }

  static setBearer (accessToken) {
    BEARER = `${accessToken}`
  }
}

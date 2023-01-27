/**
 * HTTP request layer
 * if auth is required return patched axios instance(with access token in headers)
 * else return clear axios instance
 */
import axios from "axios";
import router from "../../routers/router";
import { AuthService } from "./authService";

export class Http {
  constructor(status, url) {
    this.isAuth = status && status.auth ? status.auth : false;
    axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
    this.instance = axios.create({
      baseURL: url
    });

    return this.init();
  }

  init() {
    if (this.isAuth) {
      //request interceptor
      this.instance.interceptors.request.use(
        (request) => {
          if(AuthService.getBearer() == '') {
            $sessao._removeSession();
            AuthService.setBearer("");
            router.replace({ name: "login" });
          } else {
            request.headers.Authorization = AuthService.getBearer();
            return request;
          }
        },
        (error) => {
          return Promise.reject(error);
        }
      );
      // response interceptor
      this.instance.interceptors.response.use(
        (response) => {
          return response;
        },
        (error) => {
          try {
            if (error.status === 401) {
              $sessao._removeSession();
              AuthService.setBearer("");
              router.replace({ name: "login" });
            } else {
              if (error.response.data) return error.response;
              else return Promise.reject(error);
            }
          } catch (error) {
            throw Promise.reject(error);
          }
        }
      );
    }
    return this.instance;
  }
}

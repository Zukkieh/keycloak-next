import { AxiosInstance } from "axios";
import { createAxiosInstance } from "@/lib/axios";
import tokenRequester from 'keycloak-request-token';

import {
  IAuthRepository,
} from "@/server/domains/repositories";

interface IBaseRestRepository {
  readonly axios: AxiosInstance;
}

export class AuthRepository
  implements IBaseRestRepository, IAuthRepository
{
  readonly axios: AxiosInstance;

  constructor(url: string, bearerToken?: string) {
    this.axios = createAxiosInstance(url, bearerToken);
  }

  async login({user, password} : { user: string, password: string }): Promise<string> {

    try{
      const res = await tokenRequester("localhost", {})
      return res;
    }
    catch (e) {
      return e?.error_description;
    }
    
  }
}

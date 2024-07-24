import { IAuthRepository } from "./repositories";


export interface IAuthDomain {
  readonly authRepository: IAuthRepository;

  login({user, password} : { user: string, password: string }): Promise<string>;
}

export class AuthDomain implements IAuthDomain {
  readonly authRepository: IAuthRepository;

  constructor(
    authRepository: IAuthRepository,
  ) {
    this.authRepository = authRepository;
  }

  async login({user, password} : { user: string, password: string }) : Promise<string> {
    const response = await this.authRepository.login({user, password});

    if (!response) {
      throw new Error("Unauthorized");
    }
    return response;
  }
}
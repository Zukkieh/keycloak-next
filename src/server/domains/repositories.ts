export type ServiceHealth = {
  statusMessage?: string | null;
};

interface IBaseRepository {
  getServiceHealth(): Promise<ServiceHealth>;
}

export interface IAuthRepository  {
  login({user, password} : { user: string, password: string }): Promise<string>;
}

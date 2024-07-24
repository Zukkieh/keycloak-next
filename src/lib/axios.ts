import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  CreateAxiosDefaults,
} from "axios";

export function createAxiosInstance(
  url: string,
  bearerToken?: string
): AxiosInstance {
  const axiosConfig: CreateAxiosDefaults = {
    baseURL: url,
  };
  addBearerTokenHeader(axiosConfig, bearerToken);

  const instance = axios.create(axiosConfig);

  instance.interceptors.response.use(undefined, errorHandler);

  return instance;
}

export function addBearerTokenHeader(
  config: AxiosRequestConfig | CreateAxiosDefaults,
  bearerToken?: string
) {
  if (!bearerToken) return;

  config.headers = {
    ...config.headers,
    Authorization: `Bearer ${bearerToken}`,
  };
}

function errorHandler(error: AxiosError): Promise<Error> {
  let errorCause = new Error();

  if (error.response) {
    const data = error.response.data as Error;

    errorCause = new Error(
      data.message,
    );
  }

  return Promise.reject(errorCause);
}

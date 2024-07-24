import { S3Repository } from "@metronetinc/caap-bff-utils-package";
import { AuthDomain } from "@metronetinc/caap-cognito-package/backend";

import domainWrapperFactory from "@/lib/nextApi/domainWrapperFactory";
import { CarriersDomain } from "@/server/domains/carriers";
import { CarriersRestRepository } from "@/server/repositories/rest/carriers";
import mockCarriersDomain from "@/mocks/server/domains/carriers";
import mockCarriersRepository from "@/mocks/server/repositories/carriers";
import mockS3Repository from "@/mocks/server/repositories/s3";
import mockConfig from "@/mocks/config";
import mockApiSession from "@/mocks/lib/nextApi/ApiSession";
import mockAuthDomain from "@/mocks/server/domains/auth";
import mockCognitoRepository from "@/mocks/server/repositories/cognito";

jest.mock("@/config", () => {
  return jest.requireActual<typeof mockConfig>("@/mocks/config");
});
jest.mock("@/server/domains/carriers", () => {
  return {
    CarriersDomain: jest.fn().mockImplementation(() => mockCarriersDomain),
  };
});
jest.mock("@/server/repositories/rest/carriers", () => {
  return {
    CarriersRestRepository: jest
      .fn()
      .mockImplementation(() => mockCarriersRepository),
  };
});

const carriersDomainMock = CarriersDomain as unknown as jest.Mock;
const carriersRepositoryMock = CarriersRestRepository as jest.Mock;
const s3RepositoryMock = S3Repository as jest.Mock;

beforeEach(() => {
  carriersDomainMock.mockClear();
  carriersRepositoryMock.mockClear();
  s3RepositoryMock.mockClear();
});

describe("domainWrapperFactory", () => {
  it("Throws with invalid url", () => {
    expect(() => domainWrapperFactory("api/carriers", mockApiSession)).toThrow(
      "Invalid url: api/carriers."
    );
  });

  it("Creates domain with carriers", () => {
    const domainWrapper = domainWrapperFactory("/api/carriers", mockApiSession);

    expect(domainWrapper.carriers).toBe(mockCarriersDomain);

    expect(carriersRepositoryMock).toHaveBeenCalledTimes(1);
    expect(carriersRepositoryMock).toHaveBeenCalledWith(
      "mock.url.carriers",
      "mock.idToken"
    );
    expect(s3RepositoryMock).toHaveBeenCalledTimes(1);

    expect(carriersDomainMock).toHaveBeenCalledTimes(1);
    expect(carriersDomainMock).toHaveBeenCalledWith(
      mockCarriersRepository,
      mockS3Repository
    );
  });

  it("Creates empty domain with auth", () => {
    const domainWrapper = domainWrapperFactory("/api/auth", mockApiSession);

    expect(domainWrapper.auth).toBe(mockAuthDomain);

    expect(AuthDomain).toHaveBeenCalledTimes(1);
    expect(AuthDomain).toHaveBeenCalledWith(
      mockCognitoRepository,
      mockCarriersRepository,
      "carrier"
    );
  });

  it("Creates empty domain with healthz", () => {
    const domainWrapper = domainWrapperFactory("/api/healthz", mockApiSession);

    expect(domainWrapper).toStrictEqual({});
  });

  it("Creates empty domain with non existent domain", () => {
    const domainWrapper = domainWrapperFactory("/api/cakes", mockApiSession);

    expect(domainWrapper).toStrictEqual({});
  });
});

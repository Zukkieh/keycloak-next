// import config from "@/config";
// import { CarriersDomain, ICarriersDomain } from "@/server/domains/carriers";
// import { DocumentsDomain, IDocumentsDomain } from "@/server/domains/documents";
// import { IRateCardsDomain, RateCardsDomain } from "@/server/domains/rateCards";
// import { CarriersRestRepository } from "@/server/repositories/rest/carriers";
// import { DocumentsRestRepository } from "@/server/repositories/rest/documents";
// import { RateCardsRestRepository } from "@/server/repositories/rest/rateCards";
// import { ReportsRestRepository } from "@/server/repositories/rest/reports";
// import secrets from "@/utils/secrets";

import { AuthDomain, IAuthDomain } from "@/server/domains/auth";
import { AuthRepository } from "@/server/repositories/rest/auth";

export type DomainWrapper = {
  auth?: IAuthDomain;
};

const DOMAINS = {
  Auth: "auth",
} as const;

const domainWrapperFactory = (
  url: string
): DomainWrapper => {
  const domain = extractDomainFromUrl(url);

  console.log("=============================================")
  console.log(domain)
  console.log("=============================================")

  const authRepository = new AuthRepository("");

  switch (domain) {

    case DOMAINS.Auth:
      return {
        auth: new AuthDomain(
          authRepository
        ),
      };

    default:
      return {};
  }
};

// Next api's urls follow the format "/api/{someDomain}" or "/api/{someDomain}/{specifier}..."
const extractDomainFromUrl = (url: string) => {
  const urlParts = url.split("/");

  if (urlParts.length < 3) throw new Error(`Invalid url: ${url}.`);

  return urlParts[2];
};

export default domainWrapperFactory;

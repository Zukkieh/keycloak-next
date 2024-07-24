import type { NextApiRequest, NextApiResponse } from "next";

import domainWrapperFactory, {
  DomainWrapper,
} from "@/lib/nextApi/domainWrapperFactory";

type NextApiContext = {
  domain?: DomainWrapper;
};
export type RequestWithContext = NextApiRequest & {
  context?: NextApiContext;
};
export type ApiHandler<T> = (
  req: RequestWithContext,
  res: NextApiResponse<T>
) => unknown | Promise<unknown>;

function withContextDomain<Response>(
  handler: ApiHandler<Response>
): ApiHandler<Response> {
  return (req, res) => {
    if (req.url === undefined) return handler(req, res);
    if (req.context === undefined) req.context = {};

    req.context.domain = domainWrapperFactory(req.url);

    return handler(req, res);
  };
}

export default function apiHandler<Response>(
  handler: ApiHandler<Response>
): ApiHandler<Response> {
  return (req, res) => {
    return handler(req, res);
  };
}

export function apiHandlerWithContextDomain<Response>(
  handler: ApiHandler<Response>
): ApiHandler<Response> {
  return apiHandler(withContextDomain(handler));
}

import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Signin() {
  const router = useRouter();
  const { status, data } = useSession();

  useEffect(() => {
    if (data?.error === 'RefreshAccessTokenError') {
      // Force sign in to hopefully resolve error
      void signIn('keycloak');
    }
    if (status === 'unauthenticated') {
      // Force sign in to hopefully resolve error
      signIn('keycloak');
    }
    if (status === "authenticated") {
      void router.push("/");
    }
  }, [data?.error, status]);

  return <div></div>;
}
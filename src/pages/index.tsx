import { useEffect } from 'react';
import { useSession, signIn } from 'next-auth/react';

import { Layout } from '../components/Layout';
import { useRouter } from 'next/router';

const IndexPage = () => {
  const router = useRouter();
  const { status, data } = useSession();

  useEffect(() => {
    if (data?.error === 'RefreshAccessTokenError') {
      // Force sign in to hopefully resolve error
      void signIn('keycloak');
    }
    if (status === 'unauthenticated') {
      // Force sign in to hopefully resolve error
      signIn('keycloak', { redirect: true });
    }
    if (status === "authenticated") {
      void router.push("/home");
    }
  }, [data?.error, status]);

  return <div></div>;
}

export default IndexPage;
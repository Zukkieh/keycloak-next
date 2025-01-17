import { useSession } from 'next-auth/react';
import type { AxiosInstance } from 'axios';

import { setupAPIClient } from '../services/api';

function useAPIClient(): AxiosInstance | undefined {
  const session = useSession();

  console.log(session)

  if (session.status === 'authenticated') {
    return setupAPIClient(session.data);
  }
}

export { useAPIClient };
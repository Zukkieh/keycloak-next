import { Layout } from '../components/Layout';

const HomePage = () => {

  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <h1 className="mt-5">Hello Next.js + Keycloak 👋</h1>
      <div className="mb-5 lead text-muted">
        This is an example of a Next.js site using Keycloak.
      </div>
    </Layout>
  );
}

export default HomePage;
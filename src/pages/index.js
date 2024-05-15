import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/admin/books');
  }, [router]);

  return <div>Redirecting...</div>;
};

export default Home;

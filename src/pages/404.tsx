import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Custom404 = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/');
  }, []);

  return (
    <div>
      <h1>404 - Page Not Found</h1>
    </div>
  );
};

export default Custom404;

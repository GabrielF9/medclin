import type { PropsWithChildren } from 'react';

import Sidebar from './components/Sidebar';

const AppLayout = ({ children }: PropsWithChildren) => {
  // const router = useRouter();

  // useEffect(() => {
  //   const token = storage.local.getItem('token');

  //   if (!token) {
  //     router.push('/');
  //   }
  // }, []);

  return (
    <div className="flex h-screen w-screen flex-row">
      <Sidebar />

      <div className="flex max-h-screen flex-1 flex-col overflow-hidden px-2 py-3">
        {children}
      </div>
    </div>
  );
};

export default AppLayout;

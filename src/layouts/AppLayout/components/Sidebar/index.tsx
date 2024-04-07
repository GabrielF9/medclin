import Image from 'next/image';
import { useRouter } from 'next/router';
import { LogOut } from 'react-feather';
import { tv } from 'tailwind-variants';

import Doctor from '@/icons/doctor_female.svg';
import HealthWorker from '@/icons/health_worker.svg';
import Hospital from '@/icons/hospital.svg';
import Nurse from '@/icons/nurse.svg';

const buttonStyle = tv({
  base: 'relative flex h-10 w-full items-center justify-center text-white duration-100 after:absolute after:inset-0 after:hidden after:h-full after:w-1 after:bg-white after:duration-100 hover:bg-white/20 hover:after:flex',
  variants: {
    active: { true: 'bg-white/20 after:flex' },
    logout: {
      true: 'bg-red-500 hover:bg-red-600 hover:after:hidden',
    },
  },
});

const Sidebar = () => {
  const router = useRouter();

  return (
    <div className="flex h-screen w-14 flex-col justify-between gap-3 bg-primary-500">
      <div className="flex w-full flex-col items-center gap-3 py-2">
        <Image
          src="/images/logo-white.png"
          aria-hidden
          alt=""
          width={32}
          height={32}
        />

        <button
          type="button"
          onClick={() => router.push('/home')}
          className={buttonStyle({ active: router.pathname === '/home' })}
          aria-label="Início"
        >
          <Hospital width={30} height={30} />
        </button>

        <button
          type="button"
          onClick={() => router.push('/gerencia/medicos')}
          className={buttonStyle({
            active: router.pathname === '/gerencia/medicos',
          })}
          aria-label="Médicos"
        >
          <Doctor width={30} height={30} />
        </button>

        <button
          type="button"
          onClick={() => router.push('/gerencia/enfermeiros')}
          className={buttonStyle({
            active: router.pathname === '/gerencia/enfermeiros',
          })}
          aria-label="Enfermeiros"
        >
          <Nurse width={30} height={30} />
        </button>

        <button
          type="button"
          onClick={() => router.push('/gerencia/atendentes')}
          className={buttonStyle({
            active: router.pathname === '/gerencia/atendentes',
          })}
          aria-label="Atendentes"
        >
          <HealthWorker width={30} height={30} />
        </button>
      </div>

      <div className="w-full">
        <button
          type="button"
          onClick={() => router.push('/')}
          className={buttonStyle({ logout: true })}
          aria-label="Sair"
        >
          <LogOut size={20} />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

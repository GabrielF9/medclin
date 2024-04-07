import classNames from 'classnames';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { LogOut } from 'react-feather';
import { tv } from 'tailwind-variants';

import { SIDEBAR_ITEMS } from './contants';
import S from './Sidebar.module.scss';

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

        {SIDEBAR_ITEMS.map((item) => (
          <button
            key={item.path}
            type="button"
            onClick={() => router.push(item.path)}
            className={classNames(
              buttonStyle({
                active: router.pathname === item.path,
              }),
              `${S.hoverLabel}`
            )}
            aria-label={item.label}
          >
            <item.icon width={30} height={30} />
          </button>
        ))}
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

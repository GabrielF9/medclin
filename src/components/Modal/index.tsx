import classNames from 'classnames';
import type { Dispatch, PropsWithChildren, SetStateAction } from 'react';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import If from '../If';

export interface ModalChildrenProps {
  isMounted: boolean;
  setIsMounted: Dispatch<SetStateAction<boolean>>;
}

interface PortalProps extends ModalChildrenProps, PropsWithChildren {
  hasCloseButton?: boolean;
  onClose?: () => void;
}

const Modal = ({
  children,
  hasCloseButton = false,
  isMounted,
  setIsMounted,
  onClose,
}: PortalProps) => {
  const ref = useRef<Element | null>(null);

  useEffect(() => {
    ref.current = document.querySelector<HTMLElement>('#modal');

    if (ref.current) {
      document.addEventListener('keydown', handleEscape);
    }
  }, [isMounted]);

  const handleEscape = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      handleClose();
    }
  };

  const handleClose = () => {
    setIsMounted(false);

    if (onClose) {
      onClose();
    }
  };

  return isMounted && ref.current
    ? createPortal(
        <div
          className="fixed inset-0 z-10 flex size-full items-center justify-center overflow-auto bg-black/40 backdrop-blur-sm"
          onClick={handleClose}
          role="presentation"
        >
          <div
            className={classNames(
              'absolute bottom-0 flex h-fit w-full flex-col rounded-t-2xl bg-white sm:relative sm:w-fit sm:rounded-2xl',
              {
                'pt-8': hasCloseButton,
              }
            )}
            onClick={(e) => e.stopPropagation()}
            role="presentation"
          >
            <If
              condition={hasCloseButton}
              renderIf={
                <button
                  type="button"
                  className="absolute right-0 top-0 self-end p-2 hover:text-gray-800"
                  onClick={handleClose}
                  aria-label="Fechar modal"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-6 text-gray-500 transition-colors duration-300 hover:text-gray-800"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="{2}"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              }
            />

            {children}
          </div>
        </div>,
        ref.current
      )
    : null;
};

export default Modal;

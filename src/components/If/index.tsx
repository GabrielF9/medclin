import type { ReactElement, ReactNode } from 'react';

interface IIfProps {
  condition: boolean | null | undefined;
  renderIf: ReactNode;
  renderElse?: ReactNode;
}

const If = ({ condition, renderIf, renderElse }: IIfProps) => {
  return (condition ? renderIf : renderElse) as ReactElement;
};

export default If;

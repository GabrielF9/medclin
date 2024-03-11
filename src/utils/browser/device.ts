import isClient from './isClient';

export const isMobile = () => {
  return (
    isClient() &&
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  );
};

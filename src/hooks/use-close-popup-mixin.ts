import {useEffect} from 'react';

export const useClosePopupMixin = (onClose?: () => void) => {
  const handler = (e: KeyboardEvent | MouseEvent) => {
    if ((e.target as Element).classList.contains('overlay') || (e as KeyboardEvent).key === 'Escape') {
      onClose && onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handler);
    document.addEventListener('mousedown', handler);

    return () => {
      document.removeEventListener('keydown', handler);
      document.removeEventListener('mousedown', handler);
    };
  }, []);
};

import {Icon} from 'assets/icons';
import {PBox} from 'components/primitives/p-box';
import {PTypo} from 'components/primitives/p-typo';
import {theme} from 'constants/theme';
import {useRef, ReactText, ReactNode} from 'react';
import {toast} from 'react-toastify';
import {pending} from 'components/primitives/p-toast-view/p-toast-view.styles';
import {THREE_MINUTES} from 'constants/common';

export const useToast = () => {
  const toastId = useRef<ReactText | null>(null);

  const dismiss = () => toast.dismiss(toastId.current!);

  const showPending = (message?: string | ReactNode) => {
    setTimeout(() => dismiss(), THREE_MINUTES);

    toastId.current = toast.loading(
      () => (
        <PBox>
          <PTypo variant="h2" color={theme.pallete.light.warning.main}>
            Pending
          </PTypo>
          <PTypo variant="body3">
            Please, don't Refresh or Close this tab. <br />
            {message ||
              'Transaction processing is in progress. When this operation is completed, the window will automatically close.'}
          </PTypo>
        </PBox>
      ),
      {icon: <Icon.Pending className={pending} />}
    );
  };

  const showSuccess = () =>
    toast.update(toastId.current!, {
      render: () => (
        <PBox>
          <PTypo variant="h2" color={theme.pallete.light.success.main}>
            Successful
          </PTypo>
          <PTypo variant="body3">The transaction has been processed successfully. Congratulations!</PTypo>
        </PBox>
      ),
      icon: <Icon.Successful />,
      closeButton: ({closeToast}: {closeToast: () => void}) => (
        <Icon.Cross onClick={closeToast} width={17} height={17} fill={theme.pallete.light.grey[900]} />
      ),
      type: toast.TYPE.SUCCESS,
      isLoading: false,
      autoClose: 5000,
    });

  const showError = () =>
    toast.update(toastId.current!, {
      render: () => (
        <PBox>
          <PTypo variant="h2" color={theme.pallete.light.error.main}>
            Failed
          </PTypo>
          <PTypo variant="body3">The transaction has not been processed. Try again or contact support.</PTypo>
        </PBox>
      ),
      icon: <Icon.Filed />,
      closeButton: ({closeToast}: {closeToast: () => void}) => (
        <Icon.Cross onClick={closeToast} width={17} height={17} fill={theme.pallete.light.grey[900]} />
      ),
      type: toast.TYPE.ERROR,
      isLoading: false,
      autoClose: 5000,
    });

  return {showPending, showSuccess, showError};
};

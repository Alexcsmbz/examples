import {PopupBase} from '../base';
import {PBox} from 'components/primitives/p-box';
import {PTypo} from 'components/primitives/p-typo';
import {memo} from 'react';
import {Image} from 'assets/images';
import {Route} from 'constants/routes';
import {useNavigate} from 'react-router-dom';

const PopupMessageSent = ({onClose}: {onClose: () => void}) => {
  const navigate = useNavigate();

  return (
    <PopupBase
      withoutImage
      title="Send result"
      onCrossClick={onClose}
      open
      buttons={{
        confirm: {
          name: 'Go to FAQ ',
          type: 'button',
          variant: 'apply-secondary',
          onClick: () => {
            navigate(Route.faq.path);
            onClose();
          },
        },
      }}
    >
      <PBox display="grid" gap="25px" marginBottom="40px">
        <PBox display="grid" justifyContent="center">
          <img src={Image.messageSent} alt="" width={120} />
        </PBox>
        <PBox textAlign="center">
          <PTypo variant="h2" regular>
            Your message has been sent.{' '}
          </PTypo>
          <PTypo variant="h3" regular>
            We will contact you shortly.{' '}
          </PTypo>
        </PBox>
      </PBox>
    </PopupBase>
  );
};

export const PopupMessageSentMemoized = memo(PopupMessageSent);

import {PItemCard} from 'components/primitives/p-item-card';
import {PItemCardProps} from 'components/primitives/p-item-card/p-item-card.types';
import {useCurrentDevice} from 'hooks';
import {memo} from 'react';
import {useNavigate} from 'react-router-dom';

export const CItemCard = (props: PItemCardProps) => {
  const {mobile, tablet} = useCurrentDevice();
  const navigate = useNavigate();

  return <PItemCard imageSize={mobile ? '184px' : tablet ? '202px' : '284px'} navigate={navigate} {...props} />;
};

export const CItemCardMemoized = memo(CItemCard);

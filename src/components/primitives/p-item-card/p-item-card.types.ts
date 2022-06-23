import {useNavigate} from 'react-router-dom';
import {ItemCollection, MarketItem, NftToken} from 'types/api';
import {CardAction} from 'types/custom';

export type PItemCardProps = {
  onHeartClick?: (itemEntity: MarketItem | NftToken) => void;
  href?: string;
  className?: string;
  actions?: CardAction[];
  navigate?: ReturnType<typeof useNavigate>;
  itemEntity: NftToken | MarketItem | ItemCollection;
  imageSize?: string;
  disabled?: boolean;
  address?: string | null;
};

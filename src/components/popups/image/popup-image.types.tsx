import {MarketItem, NftToken} from 'types/api';

export type PopupImageProps = {
  onClose: () => void;
  itemEntity: NftToken | MarketItem;
};

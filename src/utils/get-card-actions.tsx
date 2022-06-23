import {Icon} from 'assets/icons';
import {Network} from 'constants/network';
import {handleSmoothScrollTo} from 'hooks/use-smooth-scroll';
import {isEqual} from 'lodash';
import {MarketItem, NftToken} from 'types/api';
import {CardAction} from 'types/custom';

export const getItemEntityActions = ({
  itemEntity,
  account,
  actions: {navigate, removeFromSale, transfer, moveToCollection, share, burn},
}: {
  itemEntity?: NftToken | MarketItem;
  account?: string | null;
  actions: {
    navigate?: (url: string) => void;
    burn?: (itemEntity?: NftToken) => void;
    removeFromSale?: (itemEntity?: MarketItem) => void;
    transfer?: (itemEntity?: NftToken) => void;
    moveToCollection?: (itemEntity?: NftToken | MarketItem) => void;
    share?: (itemEntity?: NftToken | MarketItem) => void;
  };
}): CardAction[] =>
  account
    ? [
        {
          icon: <Icon.Share />,
          name: 'Share',
          onClick: () => share && share(itemEntity),
        },
        (itemEntity as MarketItem)?.seller?.walletAddress?.toLowerCase() === account?.toLowerCase() ||
        (itemEntity as NftToken)?.nftTokenDetail?.nftTokenDetailOwners
          ?.find(o => o.ownerAddress?.toLowerCase() === account?.toLowerCase())
          ?.owner?.walletAddress?.toLowerCase() === account?.toLowerCase()
          ? {
              icon: <Icon.Edit />,
              name: 'Edit',
              onClick: () => {
                navigate &&
                  navigate(`/items/edit/${itemEntity?.id}/${(itemEntity as MarketItem)?.seller?.walletAddress || 0}`);
                handleSmoothScrollTo('edit-item');
              },
            }
          : {},
        (itemEntity as NftToken)?.nftTokenDetail?.nftTokenDetailOwners
          ?.find(o => o.ownerAddress?.toLowerCase() === account?.toLowerCase())
          ?.owner?.walletAddress?.toLowerCase() === account?.toLowerCase()
          ? {
              icon: Network[(itemEntity as NftToken)?.nftTokenDetail?.chainId!].currency.icon,
              name: 'Put on sale',
              onClick: () => {
                navigate && navigate(`/items/put-on-sale/${itemEntity?.id}/0`);
                handleSmoothScrollTo('put-on-sale');
              },
            }
          : {},
        (itemEntity as MarketItem)?.seller?.walletAddress?.toLowerCase() === account?.toLowerCase()
          ? {
              icon: <Icon.Remove />,
              name: 'Remove from sale',
              onClick: () => removeFromSale && removeFromSale(itemEntity),
            }
          : {},
        (itemEntity as NftToken)?.nftTokenDetail?.nftTokenDetailOwners
          ?.find(o => o.ownerAddress?.toLowerCase() === account?.toLowerCase())
          ?.owner?.walletAddress?.toLowerCase() === account?.toLowerCase()
          ? {
              icon: <Icon.Burn />,
              name: 'Burn',
              onClick: () => burn && burn(itemEntity),
            }
          : {},
        (itemEntity as NftToken)?.nftTokenDetail?.nftTokenDetailOwners
          ?.find(o => o.ownerAddress?.toLowerCase() === account?.toLowerCase())
          ?.owner?.walletAddress?.toLowerCase() === account?.toLowerCase()
          ? {
              icon: <Icon.FlatRight />,
              name: 'Transfer',
              onClick: () => transfer && transfer(itemEntity),
            }
          : {},
        (itemEntity as MarketItem)?.seller?.walletAddress?.toLowerCase() === account?.toLowerCase() ||
        (itemEntity as NftToken)?.nftTokenDetail?.nftTokenDetailOwners
          ?.find(o => o.ownerAddress?.toLowerCase() === account?.toLowerCase())
          ?.owner?.walletAddress?.toLowerCase() === account?.toLowerCase()
          ? {
              icon: <Icon.MoveTo />,
              name: 'Move to collection',
              onClick: () => moveToCollection && moveToCollection(itemEntity),
            }
          : {},
      ].filter(a => !isEqual(a, {}))
    : [
        {
          icon: <Icon.Share />,
          name: 'Share',
          onClick: () => share && share(itemEntity),
        },
      ];

export const getCollectionActions = ({remove, rename}: {remove?: () => void; rename?: () => void}): CardAction[] => [
  {
    icon: <Icon.Edit />,
    name: 'Rename',
    onClick: rename,
  },
  {
    icon: <Icon.Delete />,
    name: 'Delete',
    onClick: remove,
  },
];

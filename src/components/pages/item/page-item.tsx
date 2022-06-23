import {PBox} from 'components/primitives/p-box';
import {PTypo} from 'components/primitives/p-typo';
import {useContract, useCurrentDevice, usePopup, useProvider} from 'hooks';
import {PopupBuyItem} from 'components/popups/buy-item';
import {useNavigate, useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  getAuthorsAction,
  getCategoriesAction,
  getCollectionsAction,
  getMarketItemByIdAction,
  getNftTokenByIdAction,
} from 'store/app/actions';
import {appItemEntitySelector, appLoadingSelector} from 'store/app/selectors';
import {setCollections, setItemEntity} from 'store/app/slice-app';
import {PLoader} from 'components/primitives/p-loader';
import {
  Category,
  ItemCollection,
  NftTokenDetailStateEnum,
  MarketItem,
  NftToken,
  MarketItemStatus,
  TokenType,
} from 'types/api';
import {State} from 'store/types';
import {userAccountSelector} from 'store/user/selectors';
import {PageItemMode} from 'types/custom';
import {getItemEntityActions} from 'utils/get-card-actions';
import {PopupBurn} from 'components/popups/burn';
import {PopupRemoveFromSale} from 'components/popups/remove-from-sale';
import {PopupTransfer} from 'components/popups/transfer';
import {PopupMoveToCollection} from 'components/popups/move-to-collelction';
import {deleteFavoriteService, postFavoriteService} from 'services/app';
import {ABI_1155, ABI_721} from 'constants/abis';
import {PopupShare} from 'components/popups/share';
import {connectToWallet} from 'utils/conneсt-to-wallet';
import {Route} from 'constants/routes';
import {PopupSwitchNetwork} from 'components/popups/switch-network';
import {SectionMainD, SectionMainM, SectionMainT} from './components/section-main';
import {PopupImage} from 'components/popups/image';

export const PageItem = () => {
  const {mobile, tablet, desktop} = useCurrentDevice();
  const {show} = usePopup();
  const {id, seller, mode} = useParams<{id: string; seller: string; mode: PageItemMode}>();
  const dispatch = useDispatch();
  const {walletConnected} = useSelector(userAccountSelector);
  const itemEntity = useSelector(appItemEntitySelector);
  const loading = useSelector(appLoadingSelector);
  const {address} = useSelector(userAccountSelector);
  const selectedCategory: Category[] = useSelector((state: State) =>
    state.app.categories.filter(
      (c: Category) =>
        c.id ===
          (itemEntity as NftToken)?.nftTokenDetail?.nftTokenDetailOwners?.find(
            o => o.ownerAddress?.toLowerCase() === address?.toLowerCase()
          )?.categoryId ||
        c.id ===
          (itemEntity as MarketItem)?.nftToken?.nftTokenDetail?.nftTokenDetailOwners?.find(
            o => o.ownerAddress?.toLowerCase() === address?.toLowerCase()
          )?.categoryId ||
        c.id ===
          (itemEntity as MarketItem)?.nftToken?.nftTokenDetail?.nftTokenDetailOwners?.find(
            o => o.ownerAddress?.toLowerCase() === (itemEntity as MarketItem).seller?.walletAddress?.toLowerCase()
          )?.categoryId
    )
  );
  const selectedCollection: ItemCollection[] = useSelector((state: State) =>
    state.app.collections?.filter(
      (c: ItemCollection) =>
        c.id ===
          (itemEntity as NftToken)?.nftTokenDetail?.nftTokenDetailOwners?.find(
            o => o.ownerAddress?.toLowerCase() === address?.toLowerCase()
          )?.itemCollectionId ||
        c.id ===
          (itemEntity as MarketItem)?.nftToken?.nftTokenDetail?.nftTokenDetailOwners?.find(
            o => o.ownerAddress?.toLowerCase() === address?.toLowerCase()
          )?.itemCollectionId
    )
  );

  const navigate = useNavigate();
  const {provider, setProvider} = useProvider();
  const onBuyClick = () => {
    if (!walletConnected) {
      connectToWallet(setProvider);
      return;
    }

    Number(provider?.chainId) !== (itemEntity as MarketItem)?.nftToken?.chainId
      ? show(PopupSwitchNetwork, {
          provider,
          chainId: (itemEntity as MarketItem)?.nftToken?.chainId!,
          onSwitch: () => show(PopupBuyItem, {item: itemEntity!}),
        })
      : show(PopupBuyItem, {item: itemEntity!});
  };
  const contract721 = useContract(
    (itemEntity as NftToken)?.contractAddress || (itemEntity as MarketItem)?.nftToken?.contractAddress!,
    ABI_721
  );
  const contract1155 = useContract(
    (itemEntity as NftToken)?.contractAddress || (itemEntity as MarketItem)?.nftToken?.contractAddress!,
    ABI_1155
  );
  const [royalty, setRoyalty] = useState('');

  useEffect(() => {
    (async () => {
      try {
        if (itemEntity?.tokenType === TokenType.ERC721) {
          const [, royalty] = await contract721?.royaltyInfo(itemEntity?.tokenId, '10000');
          setRoyalty((royalty.toNumber() / 100 || 0).toString());
        }
        if (itemEntity?.tokenType === TokenType.ERC1155) {
          const [, royalty] = await contract1155?.royaltyInfo(itemEntity?.tokenId, '10000');
          setRoyalty((royalty.toNumber() / 100 || 0).toString());
        }
      } catch (e) {
        console.error(e);
      }
    })();
  }, [itemEntity]);

  useEffect(() => {
    dispatch(seller !== '0' ? getMarketItemByIdAction({id}) : getNftTokenByIdAction({id}));

    //FIXME: fix this dirty place. remove logic to breadcrumbs components
    dispatch(getAuthorsAction({}));
    dispatch(getCollectionsAction({}));
    dispatch(getCategoriesAction({}));

    return () => {
      dispatch(setItemEntity(undefined));
    };
  }, [id]);

  useEffect(() => {
    if (!address && (mode === 'edit' || mode === 'put-on-sale')) navigate(Route.home.path);
  }, [address]);

  useEffect(() => {
    if (itemEntity === null || (itemEntity as MarketItem)?.status === MarketItemStatus.Close) navigate(Route.home.path);
  }, [itemEntity]);

  useEffect(() => {
    if (
      (itemEntity as NftToken)?.nftTokenDetail?.state === NftTokenDetailStateEnum.Draft ||
      (itemEntity as MarketItem)?.nftToken?.nftTokenDetail?.state === NftTokenDetailStateEnum.Draft ||
      (itemEntity as NftToken)?.nftTokenDetail?.state === NftTokenDetailStateEnum.Pending ||
      (itemEntity as MarketItem)?.nftToken?.nftTokenDetail?.state === NftTokenDetailStateEnum.Pending ||
      (itemEntity as NftToken)?.nftTokenDetail?.state === NftTokenDetailStateEnum.ReadyToSync ||
      (itemEntity as MarketItem)?.nftToken?.nftTokenDetail?.state === NftTokenDetailStateEnum.ReadyToSync
    )
      navigate(-1);
  }, [itemEntity]);

  useEffect(
    () => () => {
      dispatch(setCollections([]));
    },
    []
  );

  return (
    <main>
      {loading ? (
        <PBox display="grid" alignContent="center" justifyItems="center" height="100%">
          <PLoader size={50} />
        </PBox>
      ) : mobile ? (
        <SectionMainM
          selectedCategory={selectedCategory}
          selectedCollection={selectedCollection}
          itemEntity={itemEntity!}
          onImageClick={() => show(PopupImage, {itemEntity: itemEntity!})}
          address={address!}
          royalty={royalty}
          mode={mode}
          seller={seller}
          dropdownContent={getItemEntityActions({
            itemEntity: itemEntity!,
            account: address,
            actions: {
              navigate,
              burn: itemEntity =>
                Number(provider?.chainId) !== itemEntity?.chainId
                  ? show(PopupSwitchNetwork, {
                      provider,
                      chainId: itemEntity?.chainId!,
                      onSwitch: () => show(PopupBurn, {itemEntity}),
                    })
                  : show(PopupBurn, {itemEntity}),
              removeFromSale: itemEntity =>
                Number(provider?.chainId) !== itemEntity?.nftToken?.chainId
                  ? show(PopupSwitchNetwork, {
                      provider,
                      chainId: itemEntity?.nftToken?.chainId!,
                      onSwitch: () => show(PopupRemoveFromSale, {itemEntity}),
                    })
                  : show(PopupRemoveFromSale, {itemEntity}),
              transfer: itemEntity =>
                Number(provider?.chainId) !== itemEntity?.chainId
                  ? show(PopupSwitchNetwork, {
                      provider,
                      chainId: itemEntity?.chainId!,
                      onSwitch: () => show(PopupTransfer, {itemEntity}),
                    })
                  : show(PopupTransfer, {itemEntity}),
              moveToCollection: itemEntity => show(PopupMoveToCollection, {itemEntity}),
              share: itemEntity => show(PopupShare, {itemEntity}),
            },
          })?.map(({name, icon, onClick}) => (
            <PBox
              key={`action-${name}`}
              className="menu-link"
              display="grid"
              gridTemplateColumns="auto 1fr"
              alignItems="center"
              gap="8px"
              padding="12px 8px"
              onClick={onClick}
            >
              <PBox width="32px" display="grid" gridAutoFlow="column" justifyContent="center">
                {icon}
              </PBox>
              <PBox>
                <PTypo variant="body1">{name}</PTypo>
              </PBox>
            </PBox>
          ))}
          handleAddFavorite={async () => {
            await deleteFavoriteService({
              wallet: address,
              nftTokenId: (itemEntity as MarketItem)?.nftTokenId || itemEntity?.id,
            });

            dispatch(
              seller !== '0'
                ? getMarketItemByIdAction({id, withoutLoading: true})
                : getNftTokenByIdAction({id, withoutLoading: true})
            );
          }}
          handleRemoveFavorite={async () => {
            if (address) {
              await postFavoriteService({
                wallet: address,
                nftTokenId: (itemEntity as MarketItem)?.nftTokenId || itemEntity?.id,
              });

              dispatch(
                seller !== '0'
                  ? getMarketItemByIdAction({id, withoutLoading: true})
                  : getNftTokenByIdAction({id, withoutLoading: true})
              );
            } else {
              connectToWallet(setProvider);
            }
          }}
          onBuyClick={onBuyClick}
        />
      ) : tablet ? (
        <SectionMainT
          selectedCategory={selectedCategory}
          selectedCollection={selectedCollection}
          itemEntity={itemEntity!}
          onImageClick={() => show(PopupImage, {itemEntity: itemEntity!})}
          address={address!}
          royalty={royalty}
          mode={mode}
          seller={seller}
          dropdownContent={getItemEntityActions({
            itemEntity: itemEntity!,
            account: address,
            actions: {
              navigate,
              burn: itemEntity =>
                Number(provider?.chainId) !== itemEntity?.chainId
                  ? show(PopupSwitchNetwork, {
                      provider,
                      chainId: itemEntity?.chainId!,
                      onSwitch: () => show(PopupBurn, {itemEntity}),
                    })
                  : show(PopupBurn, {itemEntity}),
              removeFromSale: itemEntity =>
                Number(provider?.chainId) !== itemEntity?.nftToken?.chainId
                  ? show(PopupSwitchNetwork, {
                      provider,
                      chainId: itemEntity?.nftToken?.chainId!,
                      onSwitch: () => show(PopupRemoveFromSale, {itemEntity}),
                    })
                  : show(PopupRemoveFromSale, {itemEntity}),
              transfer: itemEntity =>
                Number(provider?.chainId) !== itemEntity?.chainId
                  ? show(PopupSwitchNetwork, {
                      provider,
                      chainId: itemEntity?.chainId!,
                      onSwitch: () => show(PopupTransfer, {itemEntity}),
                    })
                  : show(PopupTransfer, {itemEntity}),
              moveToCollection: itemEntity => show(PopupMoveToCollection, {itemEntity}),
              share: itemEntity => show(PopupShare, {itemEntity}),
            },
          })?.map(({name, icon, onClick}) => (
            <PBox
              key={`action-${name}`}
              className="menu-link"
              display="grid"
              gridTemplateColumns="auto 1fr"
              alignItems="center"
              gap="8px"
              padding="12px 8px"
              onClick={onClick}
            >
              <PBox width="32px" display="grid" gridAutoFlow="column" justifyContent="center">
                {icon}
              </PBox>
              <PBox>
                <PTypo variant="body1">{name}</PTypo>
              </PBox>
            </PBox>
          ))}
          handleAddFavorite={async () => {
            await deleteFavoriteService({
              wallet: address,
              nftTokenId: (itemEntity as MarketItem)?.nftTokenId || itemEntity?.id,
            });

            dispatch(
              seller !== '0'
                ? getMarketItemByIdAction({id, withoutLoading: true})
                : getNftTokenByIdAction({id, withoutLoading: true})
            );
          }}
          handleRemoveFavorite={async () => {
            if (address) {
              await postFavoriteService({
                wallet: address,
                nftTokenId: (itemEntity as MarketItem)?.nftTokenId || itemEntity?.id,
              });

              dispatch(
                seller !== '0'
                  ? getMarketItemByIdAction({id, withoutLoading: true})
                  : getNftTokenByIdAction({id, withoutLoading: true})
              );
            } else {
              connectToWallet(setProvider);
            }
          }}
          onBuyClick={onBuyClick}
        />
      ) : desktop ? (
        <SectionMainD
          selectedCategory={selectedCategory}
          selectedCollection={selectedCollection}
          itemEntity={itemEntity!}
          onImageClick={() => show(PopupImage, {itemEntity: itemEntity!})}
          address={address!}
          royalty={royalty}
          mode={mode}
          seller={seller}
          dropdownContent={getItemEntityActions({
            itemEntity: itemEntity!,
            account: address,
            actions: {
              navigate,
              burn: itemEntity =>
                Number(provider?.chainId) !== itemEntity?.chainId
                  ? show(PopupSwitchNetwork, {
                      provider,
                      chainId: itemEntity?.chainId!,
                      onSwitch: () => show(PopupBurn, {itemEntity}),
                    })
                  : show(PopupBurn, {itemEntity}),
              removeFromSale: itemEntity =>
                Number(provider?.chainId) !== itemEntity?.nftToken?.chainId
                  ? show(PopupSwitchNetwork, {
                      provider,
                      chainId: itemEntity?.nftToken?.chainId!,
                      onSwitch: () => show(PopupRemoveFromSale, {itemEntity}),
                    })
                  : show(PopupRemoveFromSale, {itemEntity}),
              transfer: itemEntity =>
                Number(provider?.chainId) !== itemEntity?.chainId
                  ? show(PopupSwitchNetwork, {
                      provider,
                      chainId: itemEntity?.chainId!,
                      onSwitch: () => show(PopupTransfer, {itemEntity}),
                    })
                  : show(PopupTransfer, {itemEntity}),
              moveToCollection: itemEntity => show(PopupMoveToCollection, {itemEntity}),
              share: itemEntity => show(PopupShare, {itemEntity}),
            },
          })?.map(({name, icon, onClick}) => (
            <PBox
              key={`action-${name}`}
              className="menu-link"
              display="grid"
              gridTemplateColumns="auto 1fr"
              alignItems="center"
              gap="8px"
              padding="12px 8px"
              onClick={onClick}
            >
              <PBox width="32px" display="grid" gridAutoFlow="column" justifyContent="center">
                {icon}
              </PBox>
              <PBox>
                <PTypo variant="body1">{name}</PTypo>
              </PBox>
            </PBox>
          ))}
          handleAddFavorite={async () => {
            await deleteFavoriteService({
              wallet: address,
              nftTokenId: (itemEntity as MarketItem)?.nftTokenId || itemEntity?.id,
            });

            dispatch(
              seller !== '0'
                ? getMarketItemByIdAction({id, withoutLoading: true})
                : getNftTokenByIdAction({id, withoutLoading: true})
            );
          }}
          handleRemoveFavorite={async () => {
            if (address) {
              await postFavoriteService({
                wallet: address,
                nftTokenId: (itemEntity as MarketItem)?.nftTokenId || itemEntity?.id,
              });

              dispatch(
                seller !== '0'
                  ? getMarketItemByIdAction({id, withoutLoading: true})
                  : getNftTokenByIdAction({id, withoutLoading: true})
              );
            } else {
              connectToWallet(setProvider);
            }
          }}
          onBuyClick={onBuyClick}
        />
      ) : null}
    </main>
  );
};

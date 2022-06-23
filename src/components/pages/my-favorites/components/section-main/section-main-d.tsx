import {PBox} from 'components/primitives/p-box';
import {PTypo} from 'components/primitives/p-typo';
import {CAdaptiveBox} from 'components/containers/c-adaptive-box';
import {CItemCard} from 'components/containers/c-item-card';
import {Image} from 'assets/images';
import {getItemEntityActions} from 'utils/get-card-actions';
import {PopupRemoveFromSale} from 'components/popups/remove-from-sale';
import {PopupMoveToCollection} from 'components/popups/move-to-collelction';
import {NftTokenDetailStateEnum, MarketItem} from 'types/api';
import {PopupShare} from 'components/popups/share';
import {getFavoritesNftTokensAction} from 'store/app/actions';
import {deleteFavoriteService, postFavoriteService} from 'services/app';
import {PopupSwitchNetwork} from 'components/popups/switch-network';
import {SectionMainProps} from './section-main.types';
import {PButton} from 'components/primitives/p-button';
import {CSorting} from 'components/containers/c-sorting';
import {sorByNameOptions} from 'constants/sort-options';

export const SectionMainD = (props: SectionMainProps) => {
  return (
    <CAdaptiveBox className="fade-in" marginLeft="0" width="100%" padding="16px 13.5% 0 0">
      <PBox display="grid" gridTemplateColumns="333px 1fr">
        <PBox padding="0 16px" marginBottom="89px"></PBox>
        <PBox marginBottom="89px">
          <PBox
            display="grid"
            gridTemplateColumns="auto 310px"
            justifyContent="space-between"
            alignItems="center"
            marginBottom="26px"
          >
            <PBox display="grid" gridAutoFlow="column" justifyContent="start" alignItems="baseline" gap="24px">
              <PTypo variant="h1">
                My favorites {props.favoritesMarketItems?.length !== 0 && `(${props.favoritesMarketItems?.length})`}
              </PTypo>
            </PBox>
            <CSorting options={sorByNameOptions} actions={props.sortActions} onSorting={props.onSorting} />
          </PBox>
          <PBox>
            {props.favoritesMarketItems?.length === 0 ? (
              <PBox display="grid" justifyContent="center" textAlign="center" gap="24px" marginBottom="40px">
                <PBox>
                  <img src={Image.dissatisfied} alt="" width={150} height={150} />
                </PBox>
                <PBox>
                  <PTypo variant="h2">Ouch!!!</PTypo>
                  <PTypo variant="h2" regular>
                    You have not favorite items yet.
                  </PTypo>
                </PBox>
              </PBox>
            ) : (
              <>
                <PBox
                  display="grid"
                  alignContent="start"
                  gridTemplateColumns="repeat(auto-fill, minmax(282px, 1fr))"
                  margin="0 -12px"
                >
                  {props.favoritesMarketItems?.length !== 0 &&
                    props.favoritesMarketItems?.map(itemEntity => (
                      <PBox padding="0 12px" marginBottom="24px" key={itemEntity.id}>
                        <CItemCard
                          href={
                            itemEntity.nftToken?.nftTokenDetail?.state === NftTokenDetailStateEnum.Draft ||
                            itemEntity.nftToken?.nftTokenDetail?.state === NftTokenDetailStateEnum.Pending ||
                            itemEntity.nftToken?.nftTokenDetail?.state === NftTokenDetailStateEnum.ReadyToSync
                              ? undefined
                              : `/items/view/${itemEntity.id}/${itemEntity.seller?.walletAddress}`
                          }
                          actions={getItemEntityActions({
                            itemEntity,
                            account: props.address,
                            actions: {
                              navigate: props.navigate,
                              removeFromSale: itemEntity =>
                                Number(props.provider?.chainId) !== itemEntity?.nftToken?.chainId
                                  ? props.show(PopupSwitchNetwork, {
                                      provider: props.provider,
                                      chainId: itemEntity?.nftToken?.chainId!,
                                      onSwitch: () => props.show(PopupRemoveFromSale, {itemEntity}),
                                    })
                                  : props.show(PopupRemoveFromSale, {itemEntity}),
                              moveToCollection: itemEntity => props.show(PopupMoveToCollection, {itemEntity}),
                              share: itemEntity => props.show(PopupShare, {itemEntity}),
                            },
                          })}
                          itemEntity={itemEntity}
                          onHeartClick={async itemEntity => {
                            !(itemEntity as MarketItem).nftToken?.inFavorites?.find(
                              a => a.toLowerCase() === props.address?.toLowerCase()
                            )
                              ? await postFavoriteService({
                                  wallet: props.address,
                                  nftTokenId: (itemEntity as MarketItem).nftTokenId,
                                })
                              : await deleteFavoriteService({
                                  wallet: props.address,
                                  nftTokenId: (itemEntity as MarketItem).nftTokenId,
                                });

                            props.dispatch(getFavoritesNftTokensAction({wallet: props.address!, take: 200}));
                          }}
                          disabled={
                            itemEntity.nftToken?.nftTokenDetail?.state === NftTokenDetailStateEnum.Draft ||
                            itemEntity.nftToken?.nftTokenDetail?.state === NftTokenDetailStateEnum.Pending ||
                            itemEntity.nftToken?.nftTokenDetail?.state === NftTokenDetailStateEnum.ReadyToSync
                          }
                          address={props.address}
                        />
                      </PBox>
                    ))}
                </PBox>
              </>
            )}
          </PBox>
          {props.showedItemEntities! < props.totalNftTokens! && (
            <PBox display="flex" justifyContent="center" marginTop="36px">
              <PButton variant="apply-secondary" defaultWidth="34%" onClick={props.onShowMoreClick}>
                + Show more
              </PButton>
            </PBox>
          )}
        </PBox>
      </PBox>
    </CAdaptiveBox>
  );
};

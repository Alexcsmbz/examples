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
import {Icon} from 'assets/icons';
import {PSidenav} from 'components/primitives/p-sidenav';
import {theme} from 'constants/theme';
import {CSorting} from 'components/containers/c-sorting';
import {sorByNameOptions} from 'constants/sort-options';

export const SectionMainT = (props: SectionMainProps) => {
  return (
    <CAdaptiveBox className="fade-in" width="100%" padding="15px 20px 40px">
      <PBox marginBottom="25px">
        <PBox display="grid" gridAutoFlow="column" justifyContent="space-between" alignItems="center" gap="24px">
          <PTypo variant="h2">
            My favorites {props.favoritesMarketItems?.length !== 0 && `(${props.favoritesMarketItems?.length!})`}
          </PTypo>
          <PBox onClick={props.onFilterOpen}>
            <Icon.Filter />
          </PBox>
        </PBox>
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
              gridTemplateColumns="repeat(auto-fill, minmax(222px, 1fr))"
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

      <PSidenav active={props.filterOpen}>
        <PBox
          display="grid"
          gridTemplateRows="1fr auto"
          gap="25px 0"
          padding="15px 16px"
          position="relative"
          height="100%"
        >
          <PBox display="grid" alignContent="start" gap="25px 0">
            <PBox position="absolute" top="20px" right="20px" onClick={props.onFilterClose}>
              <Icon.Cross fill={theme.pallete.light.grey[900]} />
            </PBox>
            <PBox>
              <PBox marginBottom="8px">
                <PTypo variant="h2">Sort</PTypo>
              </PBox>
              <CSorting options={sorByNameOptions} actions={props.sortActions} onSorting={props.onSorting} />
            </PBox>
          </PBox>
        </PBox>
      </PSidenav>
    </CAdaptiveBox>
  );
};

import {PBox} from 'components/primitives/p-box';
import {PTypo} from 'components/primitives/p-typo';
import {Icon} from 'assets/icons';
import {CAdaptiveBox} from 'components/containers/c-adaptive-box';
import {PButton} from 'components/primitives/p-button';
import {sortOptions} from 'constants/sort-options';
import {PSelectAsync} from 'components/primitives/p-select';
import {getMarketItemsAction, getNftTokensAction} from 'store/app/actions';
import {CBackButton} from 'components/containers/c-back-button';
import {CItemCard} from 'components/containers/c-item-card';
import {Image} from 'assets/images';
import {getCollectionActions, getItemEntityActions} from 'utils/get-card-actions';
import Web3 from 'web3';
import {PopupBurn} from 'components/popups/burn';
import {PopupRemoveFromSale} from 'components/popups/remove-from-sale';
import {PopupTransfer} from 'components/popups/transfer';
import {PInput} from 'components/primitives/p-input';
import {deleteFavoriteService, getCategoriesService, postFavoriteService} from 'services/app';
import {parse} from 'utils/parse-from-numeric-input';
import {CSorting} from 'components/containers/c-sorting';
import {PopupMoveToCollection} from 'components/popups/move-to-collelction';
import {NftTokenDetailStateEnum, MarketItem, NftToken, MarketItemStatus, ItemCollection} from 'types/api';
import {PopupShare} from 'components/popups/share';
import {PopupCreateCollection} from 'components/popups/create-collection';
import {PopupRenameCollection} from 'components/popups/rename-collection';
import {PopupDeleteCollection} from 'components/popups/delete-collection';
import {PopupSwitchNetwork} from 'components/popups/switch-network';
import {FormMyCollectionsFilterFields} from '../../page-my-collections';
import {SortAction} from 'types/custom';

export const SectionMainD = ({
  marketItems,
  collections,
  nftTokensWithoutOpenMarketItems,
  draftNftTokensInRoot,
  sortActions,
  address,
  navigate,
  provider,
  dispatch,
  show,
  formControl,
  formRegister,
  formIsDirty,
  getValues,
  totalCollections,
  onItemsFilter,
  onClearItemsFilter,
}: {
  marketItems?: MarketItem[];
  collections?: ItemCollection[];
  nftTokensWithoutOpenMarketItems?: NftToken[];
  draftNftTokensInRoot?: NftToken[];
  sortActions?: SortAction[];
  address?: string;
  navigate?: any;
  provider?: any;
  dispatch?: any;
  show?: any;
  formControl?: any;
  formRegister?: any;
  formIsDirty?: any;
  getValues?: any;
  totalCollections?: number;
  onItemsFilter?: () => void;
  onClearItemsFilter?: () => void;
}) => {
  return (
    <CAdaptiveBox className="fade-in" marginLeft="0" width="100%" padding="16px 13.5% 0 0">
      <PBox display="grid" gridTemplateColumns="333px 1fr">
        <PBox padding="0 16px" marginBottom="89px">
          <PBox marginBottom="20px">
            <PButton variant="apply-secondary" fullWidth onClick={() => show(PopupCreateCollection)}>
              + Create new collection
            </PButton>
          </PBox>
          <PBox marginBottom="8px">
            <PTypo variant="h2">Filters</PTypo>
          </PBox>
          <form onSubmit={onItemsFilter}>
            <PBox display="grid" gap="24px">
              <PBox display="grid" gap="24px">
                <PSelectAsync<FormMyCollectionsFilterFields>
                  control={formControl}
                  name="categories"
                  label="Categories"
                  placeholder="All categories"
                  loadOptions={{labels: 'name', values: 'id', service: getCategoriesService}}
                />
              </PBox>
              <PBox display="grid" gridAutoFlow="column" gridTemplateColumns="1fr 1fr" gap="16px">
                <PInput<FormMyCollectionsFilterFields>
                  control={formControl}
                  numeric
                  name="priceFrom"
                  label="Price from:"
                  placeholder="0"
                />
                <PInput<FormMyCollectionsFilterFields>
                  control={formControl}
                  numeric
                  name="priceTo"
                  label="to:"
                  placeholder="0"
                />
              </PBox>
              <PBox display="grid" gridTemplateColumns="1fr 1fr" gap="16px" justifyContent="center" alignItems="center">
                <PButton variant="apply" fullWidth disabled={!formIsDirty}>
                  Apply
                </PButton>
                <PButton variant="secondary" fullWidth disabled={!formIsDirty} onClick={onClearItemsFilter}>
                  Clear
                </PButton>
              </PBox>
            </PBox>
          </form>
        </PBox>
        <PBox marginBottom="89px">
          <PBox
            display="grid"
            gridTemplateColumns="auto 310px"
            justifyContent="space-between"
            alignItems="center"
            marginBottom="16px"
          >
            <PBox display="grid" gridAutoFlow="column" justifyContent="start" alignItems="baseline" gap="24px">
              <CBackButton inline>
                <Icon.ChevronLeft cursor="pointer" />
              </CBackButton>
              <PTypo variant="h1">My collections</PTypo>
            </PBox>
            <CSorting options={sortOptions} actions={sortActions} />
          </PBox>
          <PBox>
            <PBox
              marginBottom="10px"
              display="grid"
              gridTemplateColumns="auto 310px"
              justifyContent="space-between"
              alignItems="center"
            >
              <PTypo variant="h2">Collections {totalCollections !== 0 && `(${totalCollections})`}</PTypo>
            </PBox>
            {totalCollections === 0 ? (
              <PBox display="grid" justifyContent="center" textAlign="center" gap="24px" marginBottom="40px">
                <PBox>
                  <img src={Image.dissatisfied} alt="" width={150} height={150} />
                </PBox>
                <PBox>
                  <PTypo variant="h2">Ouch!!!</PTypo>
                  <PTypo variant="h2" regular>
                    You have not created any collection yet.
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
                  {collections?.map(c => (
                    <PBox padding="0 12px" marginBottom="24px" key={c.id}>
                      <CItemCard
                        href={`/my-collections/${c.id}/items`}
                        actions={getCollectionActions({
                          rename: () => show(PopupRenameCollection, {collection: c}),
                          remove: () => show(PopupDeleteCollection, {collection: c}),
                        })}
                        itemEntity={c}
                      />
                    </PBox>
                  ))}
                </PBox>
              </>
            )}
          </PBox>
          <PBox>
            {(marketItems?.length !== 0 ||
              nftTokensWithoutOpenMarketItems?.length !== 0 ||
              draftNftTokensInRoot?.length !== 0) && (
              <PBox marginBottom="10px">
                <PTypo variant="h2">
                  Other (
                  {marketItems?.length! + nftTokensWithoutOpenMarketItems?.length! + draftNftTokensInRoot?.length!})
                </PTypo>
              </PBox>
            )}
            <PBox
              display="grid"
              alignContent="start"
              gridTemplateColumns="repeat(auto-fill, minmax(282px, 1fr))"
              margin="0 -12px"
            >
              {marketItems?.length !== 0 &&
                marketItems?.map(itemEntity => (
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
                        account: address,
                        actions: {
                          navigate,
                          removeFromSale: itemEntity =>
                            Number(provider?.chainId) !== itemEntity?.nftToken?.chainId
                              ? show(PopupSwitchNetwork, {
                                  provider,
                                  chainId: itemEntity?.nftToken?.chainId!,
                                  onSwitch: () => show(PopupRemoveFromSale, {itemEntity}),
                                })
                              : show(PopupRemoveFromSale, {itemEntity}),
                          moveToCollection: itemEntity => show(PopupMoveToCollection, {itemEntity}),
                          share: itemEntity => show(PopupShare, {itemEntity}),
                        },
                      })}
                      itemEntity={itemEntity}
                      onHeartClick={async itemEntity => {
                        !(itemEntity as MarketItem).nftToken?.inFavorites?.find(
                          a => a.toLowerCase() === address?.toLowerCase()
                        )
                          ? await postFavoriteService({
                              wallet: address,
                              nftTokenId: (itemEntity as MarketItem).nftTokenId,
                            })
                          : await deleteFavoriteService({
                              wallet: address,
                              nftTokenId: (itemEntity as MarketItem).nftTokenId,
                            });

                        dispatch(
                          getMarketItemsAction({
                            categoryId: getValues('categories')?.value!,
                            status: MarketItemStatus.Open,
                            seller: address,
                            priceStart: getValues('priceFrom')
                              ? Web3.utils.toWei(parse(getValues('priceFrom')!).toString(), 'ether')
                              : null,
                            priceEnd: getValues('priceTo')
                              ? Web3.utils.toWei(parse(getValues('priceTo')!).toString(), 'ether')
                              : null,
                            withoutLoading: true,
                            getEmptyItemCollectionIdOnly: true,
                          })
                        );
                      }}
                      disabled={
                        itemEntity.nftToken?.nftTokenDetail?.state === NftTokenDetailStateEnum.Draft ||
                        itemEntity.nftToken?.nftTokenDetail?.state === NftTokenDetailStateEnum.Pending ||
                        itemEntity.nftToken?.nftTokenDetail?.state === NftTokenDetailStateEnum.ReadyToSync
                      }
                      address={address}
                    />
                  </PBox>
                ))}
              {draftNftTokensInRoot?.length !== 0 &&
                draftNftTokensInRoot?.map(itemEntity => (
                  <PBox padding="0 12px" marginBottom="24px" key={itemEntity.id}>
                    <CItemCard
                      onHeartClick={() => {}}
                      itemEntity={itemEntity}
                      disabled={
                        itemEntity.nftTokenDetail?.state === NftTokenDetailStateEnum.Draft ||
                        itemEntity.nftTokenDetail?.state === NftTokenDetailStateEnum.Pending ||
                        itemEntity.nftTokenDetail?.state === NftTokenDetailStateEnum.ReadyToSync
                      }
                    />
                  </PBox>
                ))}
              {nftTokensWithoutOpenMarketItems?.length !== 0 &&
                nftTokensWithoutOpenMarketItems?.map(itemEntity => (
                  <PBox padding="0 12px" marginBottom="24px" key={itemEntity.id}>
                    <CItemCard
                      actions={getItemEntityActions({
                        itemEntity,
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
                      })}
                      href={
                        itemEntity.nftTokenDetail?.state === NftTokenDetailStateEnum.Draft ||
                        itemEntity.nftTokenDetail?.state === NftTokenDetailStateEnum.Pending ||
                        itemEntity.nftTokenDetail?.state === NftTokenDetailStateEnum.ReadyToSync
                          ? undefined
                          : `/items/view/${itemEntity.id}/0`
                      }
                      itemEntity={itemEntity}
                      onHeartClick={async itemEntity => {
                        !(itemEntity as NftToken)?.inFavorites?.find(a => a.toLowerCase() === address?.toLowerCase())
                          ? await postFavoriteService({
                              wallet: address,
                              nftTokenId: (itemEntity as NftToken).id,
                            })
                          : await deleteFavoriteService({
                              wallet: address,
                              nftTokenId: (itemEntity as NftToken).id,
                            });

                        dispatch(
                          getNftTokensAction({
                            ownerAddress: address,
                            categoryId: getValues('categories')?.value!,
                            withoutLoading: true,
                          })
                        );
                      }}
                      disabled={
                        itemEntity.nftTokenDetail?.state === NftTokenDetailStateEnum.Draft ||
                        itemEntity.nftTokenDetail?.state === NftTokenDetailStateEnum.Pending ||
                        itemEntity.nftTokenDetail?.state === NftTokenDetailStateEnum.ReadyToSync
                      }
                      address={address}
                    />
                  </PBox>
                ))}
              {nftTokensWithoutOpenMarketItems?.length === 0 &&
                marketItems?.length === 0 &&
                draftNftTokensInRoot?.length === 0 && (
                  <PBox padding="0 12px">
                    <PTypo variant="h1" bold>
                      No items yet
                    </PTypo>
                  </PBox>
                )}
            </PBox>
          </PBox>
        </PBox>
      </PBox>
    </CAdaptiveBox>
  );
};

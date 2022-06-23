import {PBox} from 'components/primitives/p-box';
import {PTypo} from 'components/primitives/p-typo';
import {Icon} from 'assets/icons';
import {CAdaptiveBox} from 'components/containers/c-adaptive-box';
import {PButton} from 'components/primitives/p-button';
import {sortOptions} from 'constants/sort-options';
import {PSelectAsync} from 'components/primitives/p-select';
import {PInput} from 'components/primitives/p-input';
import {NftTokenDetailStateEnum, MarketItem, NftToken, MarketItemStatus} from 'types/api';
import {CBackButton} from 'components/containers/c-back-button';
import {getItemEntityActions} from 'utils/get-card-actions';
import Web3 from 'web3';
import {CItemCard} from 'components/containers/c-item-card';
import {SortAction} from 'types/custom';
import {PopupBurn} from 'components/popups/burn';
import {PopupTransfer} from 'components/popups/transfer';
import {PopupRemoveFromSale} from 'components/popups/remove-from-sale';
import {deleteFavoriteService, getCategoriesService, postFavoriteService} from 'services/app';
import {CSorting} from 'components/containers/c-sorting';
import {PopupMoveToCollection} from 'components/popups/move-to-collelction';
import {PopupShare} from 'components/popups/share';
import {parse} from 'utils/parse-from-numeric-input';
import {PopupSwitchNetwork} from 'components/popups/switch-network';
import {FormItemsFilterFields} from '../../page-my-items';
import {getMarketItemsAction, getNftTokensAction} from 'store/app/actions';
import {PSidenav} from 'components/primitives/p-sidenav';
import {theme} from 'constants/theme';

export const SectionMainT = ({
  itemCollectionId,
  selectedCollection,
  marketItems,
  draftNftTokens,
  nftTokensWithoutOpenMarketItems,
  address,
  navigate,
  provider,
  dispatch,
  show,
  sortActions,
  formControl,
  formRegister,
  formIsDirty,
  getValues,
  filterOpen,
  onFilterOpen,
  onFilterClose,
  onItemsFilter,
  onClearItemsFilter,
  onSorting,
}: {
  itemCollectionId?: string;
  selectedCollection?: any;
  marketItems?: MarketItem[];
  draftNftTokens?: NftToken[];
  nftTokensWithoutOpenMarketItems?: NftToken[];
  address?: string;
  navigate?: any;
  provider?: any;
  dispatch?: any;
  show?: any;
  take?: number;
  sortActions?: SortAction[];
  formControl?: any;
  formRegister?: any;
  formIsDirty?: any;
  getValues?: any;
  filterOpen?: boolean;
  onFilterOpen?: () => void;
  onFilterClose?: () => void;
  onItemsFilter?: () => void;
  onClearItemsFilter?: () => void;
  onSorting?: () => void;
}) => {
  return (
    <CAdaptiveBox className="fade-in" padding="16px 20px 40px">
      <PBox display="grid" gridAutoFlow="column" justifyContent="space-between" alignItems="center" marginBottom="16px">
        <PBox display="grid" gridAutoFlow="column" justifyContent="start" alignItems="baseline" gap="24px">
          <CBackButton inline>
            <Icon.ChevronLeft cursor="pointer" />
          </CBackButton>
          <PTypo variant="h2">{`My collections / ${selectedCollection[0]?.name}`}</PTypo>
        </PBox>

        <PBox onClick={onFilterOpen}>
          <Icon.Filter />
        </PBox>
      </PBox>

      <PBox
        display="grid"
        alignContent="start"
        gridTemplateColumns="repeat(auto-fill, minmax(204px, 1fr))"
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
                            onSwitch: () => show(PopupRemoveFromSale, {itemEntity, itemCollectionId}),
                          })
                        : show(PopupRemoveFromSale, {itemEntity, itemCollectionId}),
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
                      itemCollectionId,
                      seller: address,
                      priceStart: getValues('priceFrom')
                        ? Web3.utils.toWei(parse(getValues('priceFrom')!).toString(), 'ether')
                        : null,
                      priceEnd: getValues('priceTo')
                        ? Web3.utils.toWei(parse(getValues('priceTo')!).toString(), 'ether')
                        : null,
                      withoutLoading: true,
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
        {draftNftTokens?.length !== 0 &&
          draftNftTokens?.map(itemEntity => (
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
                href={
                  itemEntity.nftTokenDetail?.state === NftTokenDetailStateEnum.Draft ||
                  itemEntity.nftTokenDetail?.state === NftTokenDetailStateEnum.Pending ||
                  itemEntity.nftTokenDetail?.state === NftTokenDetailStateEnum.ReadyToSync
                    ? undefined
                    : `/items/view/${itemEntity.id}/0`
                }
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
                itemEntity={itemEntity}
                onHeartClick={async itemEntity => {
                  !(itemEntity as NftToken).inFavorites?.find(a => a.toLowerCase() === address?.toLowerCase())
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
                      itemCollectionId,
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
        {marketItems?.length === 0 && nftTokensWithoutOpenMarketItems?.length === 0 && draftNftTokens?.length === 0 && (
          <PBox padding="0 12px">
            <PTypo variant="h1" bold>
              No items yet
            </PTypo>
          </PBox>
        )}
      </PBox>

      <PSidenav active={filterOpen}>
        <PBox
          display="grid"
          gridTemplateRows="1fr auto"
          gap="25px 0"
          padding="15px 16px"
          position="relative"
          height="100%"
        >
          <PBox display="grid" alignContent="start" gap="25px 0">
            <PBox position="absolute" top="20px" right="20px" onClick={onFilterClose}>
              <Icon.Cross fill={theme.pallete.light.grey[900]} />
            </PBox>
            <PBox>
              <PBox marginBottom="8px">
                <PTypo variant="h2">Sort</PTypo>
              </PBox>
              <CSorting options={sortOptions} actions={sortActions} onSorting={onSorting} />
            </PBox>

            <PBox>
              <PBox marginBottom="8px">
                <PTypo variant="h2">Filters</PTypo>
              </PBox>
              <form onSubmit={onItemsFilter}>
                <PBox display="grid" gap="24px">
                  <PBox display="grid" gap="24px">
                    <PSelectAsync<FormItemsFilterFields>
                      control={formControl}
                      name="categories"
                      label="Categories"
                      placeholder="All categories"
                      loadOptions={{labels: 'name', values: 'id', service: getCategoriesService}}
                    />
                    <PBox display="grid" gridAutoFlow="column" gridTemplateColumns="1fr 1fr" gap="16px">
                      <PInput<FormItemsFilterFields>
                        control={formControl}
                        numeric
                        name="priceFrom"
                        label="Price from:"
                        placeholder="0"
                      />
                      <PInput<FormItemsFilterFields>
                        control={formControl}
                        numeric
                        name="priceTo"
                        label="to:"
                        placeholder="0"
                      />
                    </PBox>
                  </PBox>
                </PBox>
              </form>
            </PBox>
          </PBox>

          <PBox display="grid" gridTemplateColumns="1fr 1fr" gap="16px" justifyContent="center" alignItems="center">
            <PButton variant="apply" fullWidth disabled={!formIsDirty} onClick={onItemsFilter}>
              Apply
            </PButton>
            <PButton variant="secondary" fullWidth disabled={!formIsDirty} onClick={onClearItemsFilter}>
              Clear
            </PButton>
          </PBox>
        </PBox>
      </PSidenav>
    </CAdaptiveBox>
  );
};

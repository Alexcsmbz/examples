import {PBox} from 'components/primitives/p-box';
import {PTypo} from 'components/primitives/p-typo';
import {Icon} from 'assets/icons';
import {CAdaptiveBox} from 'components/containers/c-adaptive-box';
import {PButton} from 'components/primitives/p-button';
import {sortOptions} from 'constants/sort-options';
import {PSelectAsync} from 'components/primitives/p-select';
import {PInput} from 'components/primitives/p-input';
import {getMarketItemsAction} from 'store/app/actions';
import {MarketItem, MarketItemStatus} from 'types/api';
import {CBackButton} from 'components/containers/c-back-button';
import {getItemEntityActions} from 'utils/get-card-actions';
import Web3 from 'web3';
import {CItemCard} from 'components/containers/c-item-card';
import {PopupRemoveFromSale} from 'components/popups/remove-from-sale';
import {deleteFavoriteService, getCategoriesService, postFavoriteService} from 'services/app';
import {CSorting} from 'components/containers/c-sorting';
import {PopupMoveToCollection} from 'components/popups/move-to-collelction';
import {PopupShare} from 'components/popups/share';
import {parse} from 'utils/parse-from-numeric-input';
import {connectToWallet} from 'utils/conneсt-to-wallet';
import {PopupSwitchNetwork} from 'components/popups/switch-network';
import {FormItemsFilterFields} from '../../page-items';
import {SortAction} from 'types/custom';

export const SectionMainD = ({
  itemCollectionId,
  selectedCollection,
  marketItems,
  address,
  navigate,
  provider,
  setProvider,
  dispatch,
  show,
  take,
  showedItemEntities,
  totalMarketItems,
  sortActions,
  categoryId,
  formControl,
  formRegister,
  formIsDirty,
  getValues,
  onSorting,
  onShowMoreClick,
  onItemsFilter,
  onClearItemsFilter,
}: {
  itemCollectionId?: string;
  selectedCollection?: any;
  marketItems?: MarketItem[];
  address?: string;
  navigate?: any;
  provider?: any;
  setProvider?: any;
  dispatch?: any;
  show?: any;
  take?: number;
  showedItemEntities?: number;
  totalMarketItems?: number;
  sortActions?: SortAction[];
  categoryId?: string;
  formControl?: any;
  formRegister?: any;
  formIsDirty?: any;
  getValues?: any;
  onItemsFilter?: () => void;
  onClearItemsFilter?: () => void;
  onSorting?: () => void;
  onShowMoreClick?: () => void;
}) => {
  return (
    <CAdaptiveBox marginLeft="0" width="100%" padding="16px 13.5% 0 0">
      <PBox display="grid" gridTemplateColumns="333px 1fr">
        <PBox padding="0 16px" marginBottom="89px">
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
              <PTypo variant="h1">
                {`${selectedCollection[0]?.name} collection ${
                  marketItems?.length !== 0 ? `(${marketItems?.length})` : ''
                }`}
              </PTypo>
            </PBox>
            <CSorting options={sortOptions} actions={sortActions} onSorting={onSorting} />
          </PBox>
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
                    href={`/items/view/${itemEntity.id}/${itemEntity.seller?.walletAddress}`}
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
                      if (address) {
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
                            categoryId: categoryId !== 'all' ? categoryId : (getValues('categories')?.value as string),
                            status: MarketItemStatus.Open,
                            itemCollectionId,
                            priceStart: getValues('priceFrom')
                              ? Web3.utils.toWei(parse(getValues('priceFrom')!).toString(), 'ether')
                              : null,
                            priceEnd: getValues('priceTo')
                              ? Web3.utils.toWei(parse(getValues('priceTo')!).toString(), 'ether')
                              : null,
                            take,
                            withoutLoading: true,
                          })
                        );
                      } else {
                        connectToWallet(setProvider);
                      }
                    }}
                    address={address}
                  />
                </PBox>
              ))}
            {marketItems?.length === 0 && (
              <PBox padding="0 12px">
                <PTypo variant="h1" bold>
                  No items yet
                </PTypo>
              </PBox>
            )}
          </PBox>

          {showedItemEntities! < totalMarketItems! && (
            <PBox display="flex" justifyContent="center" marginTop="36px">
              <PButton variant="apply-secondary" defaultWidth="34%" onClick={onShowMoreClick}>
                + Show more
              </PButton>
            </PBox>
          )}
        </PBox>
      </PBox>
    </CAdaptiveBox>
  );
};

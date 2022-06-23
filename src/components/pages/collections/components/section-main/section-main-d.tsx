import {PBox} from 'components/primitives/p-box';
import {PTypo} from 'components/primitives/p-typo';
import {Icon} from 'assets/icons';
import {CAdaptiveBox} from 'components/containers/c-adaptive-box';
import {sortOptions} from 'constants/sort-options';
import {getMarketItemsAction} from 'store/app/actions';
import {MarketItem, MarketItemStatus} from 'types/api';
import {CBackButton} from 'components/containers/c-back-button';
import {CItemCard} from 'components/containers/c-item-card';
import {CSorting} from 'components/containers/c-sorting';
import {getItemEntityActions} from 'utils/get-card-actions';
import {PopupRemoveFromSale} from 'components/popups/remove-from-sale';
import {PopupMoveToCollection} from 'components/popups/move-to-collelction';
import {shortenAddress} from 'utils/shorten-address';
import {PopupShare} from 'components/popups/share';
import {PButton} from 'components/primitives/p-button';
import {PImage} from 'components/primitives/p-image';
import {PAvatar} from 'components/primitives/p-avatar';
import {PBackground} from 'components/primitives/p-background';
import {theme} from 'constants/theme';
import {deleteFavoriteService, getCategoriesService, postFavoriteService} from 'services/app';
import {connectToWallet} from 'utils/conneсt-to-wallet';
import {PopupSwitchNetwork} from 'components/popups/switch-network';
import {socialButton} from '../../page-collections.styles';
import {PSelectAsync} from 'components/primitives/p-select';
import {PInput} from 'components/primitives/p-input';
import {FormAuthorCollectionFilterFields} from '../../page-collections';
import {PageCollectionsProps} from '../../page-collections.types';

export const SectionMainD = (props: PageCollectionsProps) => {
  return (
    <CAdaptiveBox className="fade-in" marginLeft="0" width="100%" padding="16px 13.5% 0 0">
      <PBox display="grid" gridTemplateColumns="333px 1fr">
        <PBox padding="0 16px" marginBottom="89px">
          <PBox marginBottom="8px">
            <PTypo variant="h2">Filters</PTypo>
          </PBox>
          <form onSubmit={props.onItemsFilter}>
            <PBox display="grid" gap="24px">
              <PBox display="grid" gap="24px">
                <PSelectAsync<FormAuthorCollectionFilterFields>
                  control={props.formControl}
                  name="categories"
                  label="Categories"
                  placeholder="All categories"
                  loadOptions={{labels: 'name', values: 'id', service: getCategoriesService}}
                />
              </PBox>
              <PBox display="grid" gridAutoFlow="column" gridTemplateColumns="1fr 1fr" gap="16px">
                <PInput<FormAuthorCollectionFilterFields>
                  control={props.formControl}
                  numeric
                  name="priceFrom"
                  label="Price from:"
                  placeholder="0"
                />
                <PInput<FormAuthorCollectionFilterFields>
                  control={props.formControl}
                  numeric
                  name="priceTo"
                  label="to:"
                  placeholder="0"
                />
              </PBox>
              <PBox display="grid" gridTemplateColumns="1fr 1fr" gap="16px" justifyContent="center" alignItems="center">
                <PButton variant="apply" fullWidth disabled={!props.formIsDirty}>
                  Apply
                </PButton>
                <PButton variant="secondary" fullWidth disabled={!props.formIsDirty} onClick={props.onClearItemsFilter}>
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
              <PTypo variant="h1">{shortenAddress(props.selectedAuthor[0]?.name)} collections</PTypo>
            </PBox>
            <CSorting options={sortOptions} actions={props.sortActions} onSorting={props.onSorting} />
          </PBox>

          <PBox minHeight="350px" margin="0 0 24px" position="relative">
            <PImage
              backgroundImage={props.authorProfile?.backgroundUrl!}
              backgroundColor={props.defaultBanner?.background}
            >
              <PBox display="grid" gap="19px">
                <PBox position="relative" justifySelf="center">
                  <PAvatar
                    size="120px"
                    offset="10px"
                    backgroundColor={props.defaultBanner?.avatar}
                    mockImage={<Icon.Star fill="white" width={60} height={60} />}
                    src={props.authorProfile?.avatarUrl!}
                  />
                </PBox>
                <PBackground
                  textAlign="center"
                  padding="7px 24px 9px"
                  backgroundColor={`${theme.pallete.light.common.black}90`}
                  borderRadius={theme.radius.strong}
                >
                  <PTypo variant="h2" regular color={theme.pallete.light.common.white}>
                    {props.authorProfile?.nickname || shortenAddress(props.selectedAuthor[0]?.walletAddress)}
                  </PTypo>
                </PBackground>
              </PBox>
            </PImage>
          </PBox>
          <PBox display="grid" gridTemplateColumns="1fr auto" justifyContent="end" gap="24px" marginBottom="35px">
            {props.authorProfile?.aboutMe && (
              <PBox display="grid" gap="5px" maxWidth="58%">
                <PTypo bold>About me</PTypo>
                <PTypo>{props.authorProfile?.aboutMe}</PTypo>
              </PBox>
            )}

            <PBox display="grid" gap="11px" alignContent="start" justifyContent="end" textAlign="right">
              <PBox display="grid" gridAutoFlow="column" justifyContent="end" gap="16px">
                {props.authorProfile?.twitter && (
                  <a
                    className={socialButton}
                    href={
                      props.authorProfile?.twitter?.indexOf('@') === 0
                        ? `https://twitter.com/${props.authorProfile?.twitter?.slice(1)}`
                        : props.authorProfile?.twitter
                    }
                    rel="noopener noreferer noreferrer"
                    target="_blank"
                  >
                    <Icon.Twitter />
                  </a>
                )}
                {props.authorProfile?.instagram && (
                  <a
                    className={socialButton}
                    href={
                      props.authorProfile?.instagram?.indexOf('@') === 0
                        ? `https://instagram.com/${props.authorProfile?.instagram?.slice(1)}`
                        : props.authorProfile?.instagram
                    }
                    rel="noopener noreferer noreferrer"
                    target="_blank"
                  >
                    <Icon.Instagram />
                  </a>
                )}
                {props.authorProfile?.facebook && (
                  <a
                    className={socialButton}
                    href={
                      props.authorProfile?.facebook?.indexOf('@') === 0
                        ? `https://facebook.com/${props.authorProfile?.facebook?.slice(1)}`
                        : props.authorProfile?.facebook
                    }
                    rel="noopener noreferer noreferrer"
                    target="_blank"
                  >
                    <Icon.Fb />
                  </a>
                )}
              </PBox>
              {props.authorProfile?.website && (
                <PBox>
                  <a
                    className="link link-overflow"
                    href={
                      props.authorProfile?.website.includes('http://') ||
                      props.authorProfile?.website.includes('https://')
                        ? props.authorProfile?.website
                        : `https://${props.authorProfile?.website}`
                    }
                    rel="noopener noreferer noreferrer"
                    target="_blank"
                  >
                    {props.authorProfile?.website}
                  </a>
                </PBox>
              )}
            </PBox>
          </PBox>

          {props.collections?.length !== 0 && (
            <PBox marginBottom="10px">
              <PTypo variant="h2">Collections ({props.collections?.length})</PTypo>
            </PBox>
          )}
          <PBox
            display="grid"
            alignContent="start"
            gridTemplateColumns="repeat(auto-fill, minmax(282px, 1fr))"
            margin="0 -12px"
          >
            {props.collections?.map(c => (
              <PBox padding="0 12px" marginBottom="24px" key={c.id}>
                <CItemCard
                  href={`/categories/${props.categoryId}/authors/${props.creatorAddress}/collections/${c.id}/items`}
                  itemEntity={c}
                />
              </PBox>
            ))}
          </PBox>
          {props.marketItems?.length !== 0 && (
            <PBox marginBottom="10px">
              <PTypo variant="h2">Other ({props.marketItems?.length})</PTypo>
            </PBox>
          )}
          <PBox
            display="grid"
            alignContent="start"
            gridTemplateColumns="repeat(auto-fill, minmax(282px, 1fr))"
            margin="0 -12px"
          >
            {props.marketItems?.length !== 0 ? (
              props.marketItems?.map(itemEntity => (
                <PBox padding="0 12px" marginBottom="24px" key={itemEntity.id}>
                  <CItemCard
                    href={`/items/view/${itemEntity.id}/${itemEntity.seller?.walletAddress}`}
                    actions={getItemEntityActions({
                      itemEntity,
                      account: props.address,
                      actions: {
                        navigate: props.navigate,
                        removeFromSale: itemEntity =>
                          Number(props.provider?.chainId) !== itemEntity?.nftToken?.chainId
                            ? props.show(PopupSwitchNetwork, {
                                provider: props.provider,
                                chainId: itemEntity?.nftToken?.chainId,
                                onSwitch: () => props.show(PopupRemoveFromSale, {itemEntity}),
                              })
                            : props.show(PopupRemoveFromSale, {itemEntity}),
                        moveToCollection: itemEntity => props.show(PopupMoveToCollection, {itemEntity}),
                        share: itemEntity => props.show(PopupShare, {itemEntity}),
                      },
                    })}
                    itemEntity={itemEntity}
                    onHeartClick={async itemEntity => {
                      if (props.address) {
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

                        props.dispatch(
                          getMarketItemsAction(
                            props.categoryId !== 'all'
                              ? {
                                  seller: props.creatorAddress,
                                  status: MarketItemStatus.Open,
                                  categoryId: props.categoryId,
                                  take: props.take,
                                  withoutLoading: true,
                                }
                              : {
                                  seller: props.creatorAddress,
                                  status: MarketItemStatus.Open,
                                  take: props.take,
                                  withoutLoading: true,
                                }
                          )
                        );
                      } else {
                        connectToWallet(props.setProvider);
                      }
                    }}
                    address={props.address}
                  />
                </PBox>
              ))
            ) : (
              <PBox padding="0 12px">
                <PTypo variant="h1" bold>
                  No items yet
                </PTypo>
              </PBox>
            )}
          </PBox>

          {props.showedItemEntities! < props.totalMarketItems! && (
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

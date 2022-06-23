import {PBox} from 'components/primitives/p-box';
import {PTypo} from 'components/primitives/p-typo';
import {Icon} from 'assets/icons';
import Slider from 'react-slick';
import {getListingCarouselSettings} from '../../constants';
import {getMarketItemsAction} from 'store/app/actions';
import {useDispatch, useSelector} from 'react-redux';
import {CItemCard} from 'components/containers/c-item-card';
import {MarketItem, MarketItemStatus} from 'types/api';
import {userAccountSelector} from 'store/user/selectors';
import {deleteFavoriteService, postFavoriteService} from 'services/app';
import {useProvider} from 'hooks';
import {connectToWallet} from 'utils/conneсt-to-wallet';
import {listingSlider, slickSliderWrapper} from './section-end.styles';
import {CAdaptiveBox} from 'components/containers/c-adaptive-box';

export const SectionEndM = ({marketItems}: {marketItems?: MarketItem[]}) => {
  const dispatch = useDispatch();
  const {address} = useSelector(userAccountSelector);
  const {setProvider} = useProvider();

  return (
    <CAdaptiveBox maxWidth="100vw" padding="0 20px" className="fade-in">
      <PBox marginBottom="40px">
        {marketItems?.length !== 0 && (
          <PBox
            display="grid"
            gridAutoFlow="column"
            justifyContent="space-between"
            alignItems="center"
            marginBottom="16px"
          >
            <PBox display="grid" gridAutoFlow="column" alignItems="end" gap="10px">
              <Icon.Fire />
              <PTypo variant="h2">Top Selling</PTypo>
            </PBox>
          </PBox>
        )}
        <PBox margin="0 -12px" className={slickSliderWrapper({device: 'mobile'})}>
          <Slider {...getListingCarouselSettings({slidesToShow: 2})} className={listingSlider}>
            {marketItems?.map(itemEntity => (
              <PBox padding="0 12px" height="100%" key={itemEntity.id}>
                <CItemCard
                  href={`/items/view/${itemEntity.id}/${itemEntity.seller?.walletAddress}`}
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

                      dispatch(getMarketItemsAction({take: 10, status: MarketItemStatus.Open, withoutLoading: true}));
                    } else {
                      connectToWallet(setProvider);
                    }
                  }}
                  address={address}
                />
              </PBox>
            ))}
          </Slider>
        </PBox>
      </PBox>
    </CAdaptiveBox>
  );
};

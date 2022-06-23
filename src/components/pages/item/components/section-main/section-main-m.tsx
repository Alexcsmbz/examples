import {CAdaptiveBox} from 'components/containers/c-adaptive-box';
import {PBox} from 'components/primitives/p-box';
import {PTypo} from 'components/primitives/p-typo';
import {Icon} from 'assets/icons';
import {PAvatar} from 'components/primitives/p-avatar';
import {theme} from 'constants/theme';
import {PButton} from 'components/primitives/p-button';
import {ReactNode} from 'react';
import {Category, ItemCollection, MarketItem, NftToken, TokenType} from 'types/api';
import {CBackButton} from 'components/containers/c-back-button';
import {PageItemMode} from 'types/custom';
import {FormPutOnSale} from 'components/forms/put-on-sale';
import Web3 from 'web3';
import {FormEditItem} from 'components/forms/edit-item';
import {PBackground} from 'components/primitives/p-background';
import {shortenAddress} from 'utils/shorten-address';
import {CTextCopy} from 'components/containers/c-text-copy';
import {Image} from 'assets/images';
import {itemImageM} from '../../page-item.styles';
import {CDropdown} from 'components/containers/c-dropdown';
import {Network} from 'constants/network';

export const SectionMainM = ({
  selectedCategory,
  selectedCollection,
  itemEntity,
  address,
  royalty,
  mode,
  seller,
  dropdownContent,
  onImageClick,
  handleAddFavorite,
  handleRemoveFavorite,
  onBuyClick,
}: {
  selectedCategory?: Category[];
  selectedCollection: ItemCollection[];
  itemEntity?: MarketItem | NftToken | null | undefined;
  address?: string;
  royalty?: string;
  mode?: PageItemMode;
  seller?: string;
  dropdownContent?: ReactNode;
  onImageClick?: () => void;
  handleAddFavorite?: () => void;
  handleRemoveFavorite?: () => void;
  onBuyClick?: () => void;
}) => {
  return (
    <CAdaptiveBox paddingTop="15px" paddingBottom="40px">
      <PBox display="grid" gap="10px">
        <PBox display="grid" gridAutoFlow="column" gap="20px" justifyContent="start" alignItems="baseline">
          <CBackButton inline>
            <Icon.ChevronLeft cursor="pointer" />
          </CBackButton>
          <PTypo variant="h2">
            {`${selectedCategory && selectedCategory[0]?.name} / ${
              shortenAddress(
                (itemEntity as NftToken)?.nftTokenDetail?.nftTokenDetailOwners?.find(
                  o => o.ownerAddress?.toLowerCase() === address?.toLowerCase()
                )?.owner?.walletAddress || (itemEntity as MarketItem)?.seller?.walletAddress
              ) || 'Noname'
            } / ${(selectedCollection && selectedCollection[0]?.name) || 'Root'}`}
          </PTypo>
        </PBox>
        <PBox display="grid" gap="16px">
          <PBox position="relative" display="grid" gap="6px" borderRadius="8px" overflow="hidden">
            <PBackground backgroundColor={theme.pallete.light.grey[100]}>
              <PBox
                cursor="pointer"
                onClick={onImageClick}
                display="grid"
                alignItems="center"
                justifyContent="center"
                width="100%"
                height="424px"
              >
                <img
                  src={
                    (itemEntity as NftToken)?.nftTokenDetail?.imageUri ||
                    (itemEntity as MarketItem)?.nftToken?.nftTokenDetail?.imageUri!
                  }
                  alt={
                    (itemEntity as NftToken)?.nftTokenDetail?.name ||
                    (itemEntity as MarketItem)?.nftToken?.nftTokenDetail?.name!
                  }
                  className={itemImageM}
                />
              </PBox>
            </PBackground>
          </PBox>
          <PBox display="grid" gap="24px">
            <PBox
              display="grid"
              gap="24px"
              gridAutoFlow="column"
              alignItems={(itemEntity as MarketItem)?.seller ? 'baseline' : 'start'}
              justifyContent="space-between"
            >
              <PBox display="grid" gridAutoFlow="column" gap="8px" alignItems="center">
                <img
                  width={40}
                  height={40}
                  src={
                    Network[
                      (itemEntity as NftToken)?.nftTokenDetail?.chainId! ||
                        (itemEntity as MarketItem)?.nftToken?.nftTokenDetail?.chainId!
                    ]?.icon
                  }
                  alt={
                    Network[
                      (itemEntity as NftToken)?.nftTokenDetail?.chainId! ||
                        (itemEntity as MarketItem)?.nftToken?.nftTokenDetail?.chainId!
                    ]?.name
                  }
                />
                <div>
                  <PTypo variant="h2" color={theme.pallete.light.primary.main}>
                    {(itemEntity as NftToken)?.nftTokenDetail?.name ||
                      (itemEntity as MarketItem)?.nftToken?.nftTokenDetail?.name}
                  </PTypo>
                  <PTypo>Token ID: {itemEntity?.tokenId}</PTypo>
                  {(itemEntity as NftToken | MarketItem)?.tokenType === TokenType.ERC1155 && (
                    <PBox display="grid" gridAutoFlow="column" alignItems="center" gap="4px" justifyContent="start">
                      <Icon.CopiesStack />
                      {(itemEntity as MarketItem)?.quantity ? (
                        <PTypo>{`${(itemEntity as MarketItem)?.quantity}/${
                          (itemEntity as MarketItem)?.totalQuantity
                        }`}</PTypo>
                      ) : (
                        <PTypo>
                          {
                            (itemEntity as NftToken)?.nftTokenDetail?.nftTokenDetailOwners?.find(
                              o => o.ownerAddress?.toLowerCase() === address?.toLowerCase()
                            )?.quantity
                          }
                        </PTypo>
                      )}
                    </PBox>
                  )}
                </div>
              </PBox>
              <PBox display="grid" gridAutoFlow="column" gap="16px" justifyContent="end" alignItems="center">
                {(itemEntity as MarketItem)?.seller && (
                  <PBox
                    display="grid"
                    gridAutoFlow="column"
                    alignItems="center"
                    gap="6px"
                    minWidth="62px"
                    justifyContent="end"
                  >
                    {(itemEntity as MarketItem)?.nftToken?.inFavorites?.find(
                      a => a.toLowerCase() === address?.toLowerCase()
                    ) ? (
                      <Icon.HeartFilled cursor="pointer" onClick={handleAddFavorite} />
                    ) : (
                      <Icon.HeartStroke cursor="pointer" onClick={handleRemoveFavorite} />
                    )}
                    {(itemEntity as MarketItem)?.nftToken?.inFavorites?.length !== 0 && (
                      <PTypo>{(itemEntity as MarketItem)?.nftToken?.inFavorites?.length}</PTypo>
                    )}
                  </PBox>
                )}
                <CDropdown content={dropdownContent} title={<Icon.MoreOptions cursor="pointer" />} />
              </PBox>
            </PBox>
            <PBox display="grid" gap="10px">
              {((itemEntity as NftToken)?.nftTokenDetail?.authorAddress ||
                (itemEntity as MarketItem)?.nftToken?.nftTokenDetail?.authorAddress) && (
                <PBox display="grid" gridAutoFlow="column" justifyContent="start" gap="10px" alignItems="center">
                  <PAvatar
                    size="40px"
                    src={
                      (itemEntity as NftToken)?.nftTokenDetail?.author?.profile?.avatarUrl ||
                      (itemEntity as MarketItem)?.nftToken?.nftTokenDetail?.author?.profile?.avatarUrl ||
                      Image.star
                    }
                  />
                  <PBox display="grid">
                    <PTypo fontWeight="600" color={theme.pallete.light.info.main}>
                      Author
                    </PTypo>
                    <CTextCopy
                      text={
                        (itemEntity as NftToken)?.nftTokenDetail?.authorAddress ||
                        (itemEntity as MarketItem)?.nftToken?.nftTokenDetail?.authorAddress!
                      }
                    />
                  </PBox>
                </PBox>
              )}

              {((itemEntity as NftToken)?.nftTokenDetail?.nftTokenDetailOwners?.length !== 0 ||
                (itemEntity as MarketItem)?.seller) && (
                <PBox display="grid" gridAutoFlow="column" justifyContent="start" gap="10px" alignItems="center">
                  {(itemEntity as NftToken)?.nftTokenDetail?.nftTokenDetailOwners?.find(
                    o => o.ownerAddress?.toLowerCase() === address?.toLowerCase()
                  ) && (
                    <>
                      <PAvatar
                        size="40px"
                        src={
                          (itemEntity as NftToken)?.nftTokenDetail?.nftTokenDetailOwners?.find(
                            o => o.ownerAddress?.toLowerCase() === address?.toLowerCase()
                          )?.owner?.profile?.avatarUrl || Image.star
                        }
                      />
                      <PBox display="grid">
                        <PTypo fontWeight="600" color={theme.pallete.light.info.main}>
                          Owner
                        </PTypo>
                        <PBox display="grid" gridAutoFlow="column">
                          <CTextCopy
                            text={
                              (itemEntity as NftToken)?.nftTokenDetail?.nftTokenDetailOwners?.find(
                                o => o.ownerAddress?.toLowerCase() === address?.toLowerCase()
                              )?.owner?.walletAddress!
                            }
                          />
                        </PBox>
                      </PBox>
                    </>
                  )}
                  {(itemEntity as MarketItem)?.seller && (
                    <>
                      <PAvatar size="40px" src={(itemEntity as MarketItem)?.seller?.profile?.avatarUrl || Image.star} />
                      <PBox display="grid">
                        <PTypo fontWeight="600" color={theme.pallete.light.info.main}>
                          Owner
                        </PTypo>
                        <PBox display="grid" gridAutoFlow="column">
                          <CTextCopy text={(itemEntity as MarketItem)?.seller?.walletAddress!} />
                        </PBox>
                      </PBox>
                    </>
                  )}
                </PBox>
              )}
            </PBox>
            <PBox>
              {(itemEntity as MarketItem)?.price && (
                <PBox display="grid" gridAutoFlow="column" gap="5px" justifyContent="start" alignItems="end">
                  <PTypo variant="h1" color={theme.pallete.light.primary.main}>
                    {Web3.utils.fromWei((itemEntity as MarketItem)?.price as string, 'ether')}
                  </PTypo>
                  <PTypo variant="h2">
                    {Network[(itemEntity as MarketItem)?.nftToken?.nftTokenDetail?.chainId!]?.currency.name}
                  </PTypo>
                </PBox>
              )}
              {royalty && (
                <PBox display="grid" gap="4px">
                  <PTypo bold>{royalty}% royalty</PTypo>
                </PBox>
              )}
            </PBox>

            {((itemEntity as NftToken)?.nftTokenDetail?.description ||
              (itemEntity as MarketItem)?.nftToken?.nftTokenDetail?.description) && (
              <PBox display="grid" gap="4px">
                <PTypo variant="h2">Description</PTypo>
                <PTypo>
                  {(itemEntity as NftToken)?.nftTokenDetail?.description ||
                    (itemEntity as MarketItem)?.nftToken?.nftTokenDetail?.description}
                </PTypo>
              </PBox>
            )}

            {mode === 'edit' && <FormEditItem mobile />}
            {mode === 'put-on-sale' && <FormPutOnSale mobile />}
            {seller !== '0' && seller?.toLowerCase() !== address?.toLowerCase() && (
              <PButton variant="apply" onClick={onBuyClick} fullWidth>
                Buy item
              </PButton>
            )}
          </PBox>
        </PBox>
      </PBox>
    </CAdaptiveBox>
  );
};

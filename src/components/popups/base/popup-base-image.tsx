import {memo} from 'react';
import {PopupBaseProps} from './popup-base.types';
import {POverlay} from 'components/primitives/p-overlay';
import {PBox} from 'components/primitives/p-box';
import {Icon} from 'assets/icons';
import {css} from '@emotion/css';
import {useClosePopupMixin} from 'hooks';
import {theme} from 'constants/theme';
import {MarketItem, NftToken} from 'types/api';

const PopupBaseImage = ({onCrossClick, open, itemEntity}: PopupBaseProps & {itemEntity: NftToken | MarketItem}) => {
  useClosePopupMixin(onCrossClick);

  return open ? (
    <POverlay
      className={css({
        display: 'grid',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'auto',
        padding: '20px 0',
      })}
    >
      <PBox maxWidth="90%" minWidth="50vw" margin="0 auto" textAlign="center">
        <img
          src={
            (itemEntity as NftToken)?.nftTokenDetail?.imageUri ||
            (itemEntity as MarketItem)?.nftToken?.nftTokenDetail?.imageUri!
          }
          alt=""
        />
      </PBox>
      <Icon.Cross
        className={css({
          position: 'absolute',
          top: '20px',
          right: '20px',
          '& rect': {fill: theme.pallete.light.common.white},
        })}
        onClick={() => {
          onCrossClick && onCrossClick();
        }}
        cursor="pointer"
      />
    </POverlay>
  ) : null;
};

export const PopupBaseImageMemoized = memo(PopupBaseImage);

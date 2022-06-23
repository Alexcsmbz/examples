import {memo} from 'react';
import {PBox} from '../p-box';
import {PTypo} from '../p-typo';
import {PBackground} from '../p-background';
import {PAvatarProps} from './p-avatar.types';
import {theme} from 'constants/theme';
import {mockShort, mockImageWrapper} from './p-avatar.styles';

const PAvatar = ({
  src,
  backgroundColor = theme.pallete.light.grey[500],
  size,
  offset,
  mock,
  mockImage,
}: PAvatarProps) => (
  <PBox textAlign="center" width={size} height={size} margin="0 auto" borderRadius={theme.radius.round}>
    <PBackground
      borderRadius={theme.radius.round}
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundImage={`url(${src})`}
      backgroundColor={backgroundColor}
      width="100%"
      height="100%"
    >
      <PBox width={size} height={size}>
        {(mock || mockImage) && !src && (
          <PBackground
            backgroundColor={theme.pallete.light.common.white}
            borderRadius={theme.radius.round}
            padding={offset}
            width="100%"
            height="100%"
          >
            <PBox
              className={mockShort({backgroundColor, size})}
              borderRadius={theme.radius.round}
              width="100%"
              height="100%"
              display="grid"
              alignItems="center"
              justifyContent="center"
            >
              {mock && <PTypo color={theme.pallete.light.common.white}>{mock?.charAt(0).toUpperCase()}</PTypo>}
              {mockImage && <PBox className={mockImageWrapper}>{mockImage}</PBox>}
            </PBox>
          </PBackground>
        )}
      </PBox>
    </PBackground>
  </PBox>
);

export const PAvatarMemoized = memo(PAvatar);

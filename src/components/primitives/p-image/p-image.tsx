import {memo} from 'react';
import {PImageProps} from './p-image.types';
import {PBox} from '../p-box';
import {PBackground} from '../p-background';
import {theme} from 'constants/theme';
import {imageWrapper, wrapper} from './p-image.styles';
//TODO: using in future
// import LazyLoad from 'react-lazyload';
import {PLoader} from 'components/primitives/p-loader';
import {cx} from '@emotion/css';

const PImage = ({
  width = '100%',
  height = '100%',
  backgroundColor = theme.pallete.light.grey[100],
  backgroundImage,
  backgroundGradient,
  image,
  children,
  disabled,
}: PImageProps) => (
  <PBox position="relative" width="100%" height="100%" minHeight="inherit" className={wrapper}>
    <PBackground
      backgroundImage={backgroundGradient ? backgroundGradient : `url(${backgroundImage})`}
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundColor={backgroundColor}
      width={width}
      height={height}
      minHeight="inherit"
      flex="0 0 auto"
      borderRadius={theme.radius.main}
      // overflow="hidden"
      filter={disabled ? theme.filter.blur : ''}
      transform={disabled ? theme.transform.scale.outZoom : ''}
    >
      <PBox
        position="relative"
        width="100%"
        height="100%"
        minHeight="inherit"
        className={cx(wrapper, imageWrapper(height))}
      >
        {image && <img src={image} alt="" />}
        <PBox position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)">
          {children}
        </PBox>
      </PBox>
    </PBackground>
    <PBox position="absolute" left="calc(50% - 16px)" top="calc(50% - 16px)">
      {((!image && !children) || disabled) && <PLoader />}
    </PBox>
  </PBox>
);

export const PImageMemoized = memo(PImage);

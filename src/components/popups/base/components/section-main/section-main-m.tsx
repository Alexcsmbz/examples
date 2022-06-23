import {memo, ReactNode} from 'react';
import {PopupBaseProps} from '../../popup-base.types';
import {POverlay} from 'components/primitives/p-overlay';
import {PBox} from 'components/primitives/p-box';
import {Icon} from 'assets/icons';
import {css} from '@emotion/css';
import {theme} from 'constants/theme';
import {PTypo} from 'components/primitives/p-typo';
import {PImage} from 'components/primitives/p-image';
import {PButton} from 'components/primitives/p-button';
import {PLoader} from 'components/primitives/p-loader';

const SectionMainM = ({
  children,
  onCrossClick,
  title,
  imageSrc,
  buttons,
  withoutImage,
  onSubmit,
}: PopupBaseProps & {children: ReactNode; onSubmit?: () => void}) => {
  return (
    <form onSubmit={onSubmit}>
      <POverlay
        className={css({
          backgroundColor: theme.pallete.light.common.white,
        })}
      >
        <PBox width="100%" height="100%">
          <PBox height="100%">
            <PBox display="grid" gridTemplateRows="1fr auto" gap="40px" padding="16px 24px" height="100%">
              <PBox display="grid" alignContent="start" gap="16px" width="100%" position="relative">
                <PBox textAlign="center">
                  <PTypo variant="h2">{title}</PTypo>
                </PBox>
                {!withoutImage &&
                  (imageSrc ? (
                    <PImage height="350px" image={imageSrc} />
                  ) : (
                    <PBox height="350px" display="grid" alignItems="center" justifyContent="center">
                      <PLoader />
                    </PBox>
                  ))}
                {children}
                <Icon.Cross
                  width={17}
                  height={17}
                  fill={theme.pallete.light.grey[500]}
                  className={css({position: 'absolute', right: '0', top: '7px'})}
                  onClick={() => {
                    onCrossClick && onCrossClick();
                  }}
                  cursor="pointer"
                />
              </PBox>
              {buttons && (
                <PBox display="grid" gridAutoFlow="column" gap="16px">
                  {buttons?.confirm && (
                    <PButton
                      variant={buttons?.confirm?.variant || 'apply'}
                      fullWidth
                      onClick={() => {
                        buttons?.confirm?.onClick && buttons.confirm.onClick();
                      }}
                      type={buttons.confirm?.type || 'submit'}
                    >
                      {buttons?.confirm?.name}
                    </PButton>
                  )}

                  {buttons?.reject && (
                    <PButton
                      variant="secondary"
                      fullWidth
                      onClick={() => {
                        onCrossClick && onCrossClick();
                        buttons?.reject?.onClick();
                      }}
                    >
                      {buttons?.reject?.name}
                    </PButton>
                  )}
                </PBox>
              )}
            </PBox>
          </PBox>
        </PBox>
      </POverlay>
    </form>
  );
};

export const SectionMainMMemoized = memo(SectionMainM);

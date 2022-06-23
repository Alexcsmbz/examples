import {memo, ReactNode} from 'react';
import {PopupBaseProps} from './popup-base.types';
import {useClosePopupMixin, useCurrentDevice} from 'hooks';
import {SectionMainD, SectionMainM, SectionMainT} from './components/section-main';

const PopupBase = ({
  children,
  onCrossClick,
  open,
  title,
  imageSrc,
  buttons,
  withoutImage,
  onSubmit,
}: PopupBaseProps & {children: ReactNode; onSubmit?: () => void}) => {
  useClosePopupMixin(onCrossClick);
  const {mobile, tablet, desktop} = useCurrentDevice();

  return open ? (
    mobile ? (
      <SectionMainM
        children={children}
        onCrossClick={onCrossClick}
        title={title}
        imageSrc={imageSrc}
        buttons={buttons}
        withoutImage={withoutImage}
        onSubmit={onSubmit}
      />
    ) : tablet ? (
      <SectionMainT
        children={children}
        onCrossClick={onCrossClick}
        title={title}
        imageSrc={imageSrc}
        buttons={buttons}
        withoutImage={withoutImage}
        onSubmit={onSubmit}
      />
    ) : desktop ? (
      <SectionMainD
        children={children}
        onCrossClick={onCrossClick}
        title={title}
        imageSrc={imageSrc}
        buttons={buttons}
        withoutImage={withoutImage}
        onSubmit={onSubmit}
      />
    ) : null
  ) : null;
};

export const PopupBaseMemoized = memo(PopupBase);

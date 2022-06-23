import {PButtonProps, Variant} from 'components/primitives/p-button/p-button.types';

export type PopupBaseProps = {
  open?: boolean;
  onCrossClick?: () => void;
  title?: string;
  imageSrc?: string;
  buttons?: {
    confirm?: {
      name: string;
      variant?: Variant;
      type?: PButtonProps['type'];
      onClick?: () => void;
    };
    reject?: {
      name: string;
      onClick: () => void;
    };
  };
  withoutImage?: boolean;
};

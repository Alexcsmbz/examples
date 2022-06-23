import {memo} from 'react';
import {PopupBaseImage} from '../base';
import {PopupImageProps} from './popup-image.types';

const PopupImage = ({onClose, itemEntity}: PopupImageProps) => (
  <PopupBaseImage onCrossClick={onClose} itemEntity={itemEntity} open />
);

export const PopupImageMemoized = memo(PopupImage);

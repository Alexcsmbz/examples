import {FormCreateItemFields} from 'components/forms/create-item/form-create-item';
import {Blockchain, ViewTokenType} from 'types/custom';

export type CreatedItem = {
  file: File;
  tokenType: ViewTokenType;
  chainId: Blockchain['chainId'];
} & FormCreateItemFields;

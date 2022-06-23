import {ReactNode} from 'react';

export type PDropdownProps = {
  title?: ReactNode | string;
  content?: ReactNode | ReactNode[];
  dropdownClassName?: string;
};

export type PDropdownMProps = {
  dropdownOpen?: boolean;
  onDropdownOpen?: () => void;
  onDropdownClose?: () => void;
} & PDropdownProps;

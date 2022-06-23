import {providers} from 'ethers';
import {AxiosResponse} from 'axios';
import {ReactElement, ReactNode} from 'react';
import {blockchains, tokenTypes} from 'components/pages/create-item/constants';
import {AnyAction} from 'redux';

export type CurrentDevice = {
  mobile: boolean;
  tablet: boolean;
  desktop: boolean;
};

export type SelectOption = {
  label?: string;
  value?: string | null;
};

export enum Currency {
  'ETH',
}

export type Account = {
  address?: string | null;
  walletConnected: boolean;
  balance: string | null;
  currency: keyof typeof Currency | null;
  connectedWith: Wallet | null;
};

export type PageItemMode = 'view' | 'put-on-sale' | 'edit';

export type VariantOfSell = 'Fixed price' | 'Open for bids' | 'Timed auction';

export type Wallet = 'MetaMask' | 'WalletConnect';

export type Device = 'desktop' | 'tablet' | 'mobile';

export type Signer = providers.JsonRpcSigner;

export type ServerResponse<T = any> = {data: T; [x: string]: any} & AxiosResponse<T>;

export type CardAction = {
  icon?: ReactNode;
  name?: string;
  anchor?: string;
  onClick?: () => void;
};

export type SortAction = {
  action?: <T extends {}>(arg?: T) => AnyAction;
  sortVariants?: any;
  params?: {};
};

export type Blockchain = typeof blockchains[number];

export type ViewTokenType = Lowercase<typeof tokenTypes[number]['name']>;

export type Banner = {background: string; avatar: string};

export type NetworkType = {
  name: string;
  icon: string;
  rpcURL: string;
  currency: {name: string; icon: ReactElement<any, any>};
  address1155: string;
  address721: string;
  marketAddress: string;
};

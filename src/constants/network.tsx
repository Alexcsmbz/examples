import {Icon} from 'assets/icons';
import {Image} from 'assets/images';
import {NetworkType} from 'types/custom';

export const Network: {[key: number]: NetworkType} = {
  1: {
    name: 'Ethereum Mainnet',
    icon: Image.ethereum,
    rpcURL: 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
    currency: {name: 'ETH', icon: <Icon.Ethereum />},
    address1155: '0xa7304fc34F107360BA573bFf3cB34C24d5D33740',
    address721: '0x65A92aAB8909D4C68e857a425111f564264DfdE8',
    marketAddress: '0x5A1eE954C792Bbd9dCDF203455EBcD0759902EC6',
  },
  3: {
    name: 'Ropsten Test Network',
    icon: Image.ethereum,
    rpcURL: 'https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
    currency: {name: 'ETH', icon: <Icon.Ethereum />},
    address1155: '0xBa687829904ED8D77A193c529DE61b7ba79A3e34',
    address721: '0xBE0ef6578b9A436E62A2Fa03EDc2B6aaf2C3Db98',
    marketAddress: '0x79e1d1cf9cc599c7cade9819c7c0a791fd0ebff4',
  },
  137: {
    name: 'Polygon Mainnet',
    icon: Image.polygon,
    rpcURL: 'https://polygon-rpc.com/',
    currency: {name: 'MATIC', icon: <Icon.Matic />},
    address1155: '0x143415CcFa6B6c7E55AcbaA0E50543474749117E',
    address721: '0x6DF455d8465D95F9559296Ecbb0002D69b89629f',
    marketAddress: '0xC7140e3A8C849Ed69677388751FFC03225E0D010',
  },
};

import {Image} from 'assets/images';

export const blockchains = <const>[
  {
    name: 'Ethereum',
    image: Image.ethereum,
    enable: true,
    chainId: process.env.REACT_APP_STAGE === 'production' ? '1' : '3',
  },
  {name: 'Polygon', image: Image.polygon, enable: true, chainId: '137'},
  {name: 'Solana', image: Image.solana, enable: false, chainId: '0'},
];

export const tokenTypes = <const>[
  {name: 'Single', image: Image.singleTokenType, type: 'Unique item', contract: 'ERC-721'},
  {name: 'Multiple', image: Image.multipleTokenType, type: 'Non-unique set of items', contract: 'ERC-1155'},
];

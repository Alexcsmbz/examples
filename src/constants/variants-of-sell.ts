import {Image} from 'assets/images';
import {VariantOfSell} from 'types/custom';

export const variantsOfSell: {name: VariantOfSell; image: string}[] = [
  {
    name: 'Fixed price',
    image: Image.fixedPrice,
  },
  {
    name: 'Open for bids',
    image: Image.openForBids,
  },
  {
    name: 'Timed auction',
    image: Image.timedAuction,
  },
];

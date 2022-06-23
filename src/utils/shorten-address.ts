import {ethers} from 'ethers';
import {Account} from 'types/custom';

export const shortenAddress = (address: Account['address'], leftPosition: number = 5, rightPosition: number = 33) =>
  address && ethers.utils.isAddress(address.toLowerCase())
    ? address?.replace(address.split('').splice(leftPosition, rightPosition).join('') as string, '...').toLowerCase()
    : address;

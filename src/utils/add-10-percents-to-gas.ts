import {BigNumber} from '@ethersproject/bignumber';

export const add10PercentsToGas = (value: BigNumber) =>
  value.mul(BigNumber.from(10000).add(BigNumber.from(1000))).div(BigNumber.from(10000));

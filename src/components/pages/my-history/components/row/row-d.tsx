import {memo, useEffect, useState} from 'react';
import {Transaction, TransactionStatus} from 'types/api';
import Web3 from 'web3';
import {shortenAddress} from 'utils/shorten-address';
import {Icon} from 'assets/icons';
import {ellipsis} from './row.styles';
import {PTypo} from 'components/primitives/p-typo';
import {PBackground} from 'components/primitives/p-background';
import {PBox} from 'components/primitives/p-box';
import {theme} from 'constants/theme';
import {getTransactionNameWithIcon} from '../../utils/get-transaction-name';
import {Network} from 'constants/network';

const RowD = ({tx}: {tx: Transaction}) => {
  const [copiedFrom, setCopiedFrom] = useState(false);
  const [copiedTo, setCopiedTo] = useState(false);
  const [copiedHash, setCopiedHash] = useState(false);

  useEffect(() => {
    copiedFrom && setTimeout(() => setCopiedFrom(false), 2000);
    copiedTo && setTimeout(() => setCopiedTo(false), 2000);
    copiedHash && setTimeout(() => setCopiedHash(false), 2000);
  }, [copiedFrom, copiedTo, copiedHash]);

  return (
    <PBox display="grid" gridAutoFlow="column" gridTemplateColumns="194px 194px 156px 156px 200px 206px 177px">
      <PBackground borderTop={`1px solid ${theme.pallete.light.grey[500]}`}>
        <PBox display="grid" gridAutoFlow="column" padding="12px" justifyContent="start" alignItems="center" gap="8px">
          {getTransactionNameWithIcon(tx)}
        </PBox>
      </PBackground>
      <PBackground borderTop={`1px solid ${theme.pallete.light.grey[500]}`}>
        <PBox padding="12px" display="grid" gridAutoFlow="column" justifyContent="start">
          <PBox className={ellipsis} width="135px">
            <PTypo>{tx.hash || '-'}</PTypo>
          </PBox>
          {tx.hash &&
            (copiedHash ? (
              <Icon.Checked stroke={theme.pallete.light.success.main} />
            ) : (
              <Icon.Copy
                fill={theme.pallete.light.grey[700]}
                cursor="pointer"
                onClick={() => {
                  navigator.clipboard.writeText(tx.hash!);
                  setCopiedHash(true);
                }}
              />
            ))}
        </PBox>
      </PBackground>
      <PBackground borderTop={`1px solid ${theme.pallete.light.grey[500]}`}>
        <PBox padding="12px">
          <PTypo>{new Date(tx.created!).toLocaleString()}</PTypo>
        </PBox>
      </PBackground>
      <PBackground borderTop={`1px solid ${theme.pallete.light.grey[500]}`}>
        {tx?.nftToken && (
          <PBox
            display="grid"
            gridAutoFlow="column"
            padding="12px"
            justifyContent="start"
            gap="4px"
            alignItems="baseline"
            overflow="hidden"
          >
            <PTypo variant="h2" color={theme.pallete.light.primary.main}>
              {Web3.utils.fromWei(tx.amount!, 'ether')}
            </PTypo>
            <PTypo>{Network[tx?.nftToken?.chainId!]?.currency.name}</PTypo>
          </PBox>
        )}
      </PBackground>
      <PBackground borderTop={`1px solid ${theme.pallete.light.grey[500]}`}>
        <PBox padding="12px" display="grid" gridAutoFlow="column" justifyContent="start" gap="8px">
          <PTypo>{shortenAddress(tx.fromAddress)}</PTypo>
          {copiedFrom ? (
            <Icon.Checked stroke={theme.pallete.light.success.main} />
          ) : (
            <Icon.Copy
              fill={theme.pallete.light.grey[700]}
              cursor="pointer"
              onClick={() => {
                navigator.clipboard.writeText(tx.fromAddress!);
                setCopiedFrom(true);
              }}
            />
          )}
        </PBox>
      </PBackground>
      <PBackground borderTop={`1px solid ${theme.pallete.light.grey[500]}`}>
        <PBox padding="12px" display="grid" gridAutoFlow="column" justifyContent="start" gap="8px">
          <PTypo>{shortenAddress(tx.toAddress)}</PTypo>
          {copiedTo ? (
            <Icon.Checked stroke={theme.pallete.light.success.main} />
          ) : (
            <Icon.Copy
              fill={theme.pallete.light.grey[700]}
              cursor="pointer"
              onClick={() => {
                navigator.clipboard.writeText(tx.toAddress!);
                setCopiedTo(true);
              }}
            />
          )}
        </PBox>
      </PBackground>
      <PBackground borderTop={`1px solid ${theme.pallete.light.grey[500]}`}>
        <PBox padding="12px">
          <PTypo
            color={
              tx.status === TransactionStatus.Done
                ? theme.pallete.light.success.main
                : tx.status === TransactionStatus.Error
                ? theme.pallete.light.error.main
                : tx.status === TransactionStatus.Pending
                ? theme.pallete.light.warning.main
                : ''
            }
          >
            {tx.status}
          </PTypo>
        </PBox>
      </PBackground>
    </PBox>
  );
};

export const RowDMemoized = memo(RowD);

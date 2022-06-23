import {memo, useEffect, useState} from 'react';
import {Transaction, TransactionStatus} from 'types/api';
import Web3 from 'web3';
import {shortenAddress} from 'utils/shorten-address';
import {Icon} from 'assets/icons';
import {ellipsis, sideFlag} from './row.styles';
import {PTypo} from 'components/primitives/p-typo';
import {PBackground} from 'components/primitives/p-background';
import {PBox} from 'components/primitives/p-box';
import {theme} from 'constants/theme';
import {getTransactionNameWithIcon} from '../../utils/get-transaction-name';
import {Network} from 'constants/network';

const RowM = ({tx}: {tx: Transaction}) => {
  const [copiedFrom, setCopiedFrom] = useState(false);
  const [copiedTo, setCopiedTo] = useState(false);
  const [copiedHash, setCopiedHash] = useState(false);

  useEffect(() => {
    copiedFrom && setTimeout(() => setCopiedFrom(false), 2000);
    copiedTo && setTimeout(() => setCopiedTo(false), 2000);
    copiedHash && setTimeout(() => setCopiedHash(false), 2000);
  }, [copiedFrom, copiedTo, copiedHash]);

  return (
    <PBackground
      className={sideFlag(
        tx.status === TransactionStatus.Done
          ? theme.pallete.light.success.main
          : tx.status === TransactionStatus.Error
          ? theme.pallete.light.error.main
          : tx.status === TransactionStatus.Pending
          ? theme.pallete.light.warning.main
          : ''
      )}
      backgroundColor={theme.pallete.light.common.white}
      borderRadius={theme.radius.main}
      boxShadow={theme.shadow[2]}
      margin="0 0 24px"
      padding="0 0 0 8px"
    >
      <PBackground>
        <PBox
          display="grid"
          padding="10px 12px"
          justifyContent="space-between"
          gridAutoFlow="column"
          alignItems="center"
        >
          <PBox display="grid" gridAutoFlow="column" justifyContent="start" alignItems="center" gap="8px">
            {getTransactionNameWithIcon(tx)}
          </PBox>
          <PBox>
            <PTypo variant="body2">{new Date(tx.created!).toLocaleString()}</PTypo>
          </PBox>
        </PBox>
      </PBackground>

      <PBackground>
        <PBox
          padding="0 12px"
          display="grid"
          gap="5px"
          gridAutoFlow="column"
          alignItems="baseline"
          justifyContent="space-between"
        >
          <PBox display="grid" gap="10px" gridAutoFlow="column" justifyContent="start">
            <PTypo variant="body2" bold>
              Hash:
            </PTypo>
            <PBox display="grid" gridAutoFlow="column">
              <PBox className={ellipsis} width="98px">
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
          </PBox>

          <PBox padding="0 12px">
            {tx?.nftToken && (
              <PBox
                display="grid"
                gridAutoFlow="column"
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
            <PBox textAlign="right">
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
          </PBox>
        </PBox>
      </PBackground>

      <PBackground>
        <PBox display="grid" gridAutoFlow="column" justifyContent="start" padding="5px 0 12px">
          <PBox padding="0 12px" display="grid" gridAutoFlow="column" justifyContent="start" gap="8px">
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

          <PBox padding="0 8px">
            <Icon.KeyBackspaceRight width={20} height={16} />
          </PBox>

          <PBox padding="0 12px" display="grid" gridAutoFlow="column" justifyContent="start" gap="8px">
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
        </PBox>
      </PBackground>
    </PBackground>
  );
};

export const RowMMemoized = memo(RowM);

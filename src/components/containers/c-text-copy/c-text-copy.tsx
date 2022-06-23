import {Icon} from 'assets/icons';
import {PBox} from 'components/primitives/p-box';
import {PTypo} from 'components/primitives/p-typo';
import {theme} from 'constants/theme';
import {useEffect, useState} from 'react';
import {shortenAddress} from 'utils/shorten-address';

export const CTextCopy = ({text}: {text?: string}) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    copied && setTimeout(() => setCopied(false), 2000);
  }, [copied]);

  return (
    <PBox display="grid" gridAutoFlow="column" gap="15px">
      <PTypo>{shortenAddress(text)?.toLocaleLowerCase()}</PTypo>
      {copied ? (
        <Icon.Checked stroke={theme.pallete.light.success.main} />
      ) : (
        <Icon.Copy
          fill={theme.pallete.light.grey[900]}
          cursor="pointer"
          onClick={() => {
            navigator.clipboard.writeText(text!);
            setCopied(true);
          }}
        />
      )}
    </PBox>
  );
};

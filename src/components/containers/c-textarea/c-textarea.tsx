import {PBackground} from 'components/primitives/p-background';
import {PBox} from 'components/primitives/p-box';
import {PTextarea} from 'components/primitives/p-textarea';
import {PTextareaProps} from 'components/primitives/p-textarea/p-textarea.types';
import {PTypo} from 'components/primitives/p-typo';
import {theme} from 'constants/theme';
import {memo as ReactMemo, useState} from 'react';

const CTextarea = <FormValues extends Record<string, unknown>>({...props}: PTextareaProps<FormValues>) => {
  const [value, setValue] = useState('');

  return (
    <PBox position="relative">
      <PTextarea
        {...props}
        onChange={e => setValue(e?.target.value!)}
        counter={
          props.maxLength && (
            <PBox marginTop="3px" position="absolute" bottom="11px" right="10px">
              <PBackground padding="0 2px" backgroundColor={theme.pallete.light.common.white}>
                <PTypo
                  variant="body2"
                  color={
                    value?.length! === props.maxLength
                      ? theme.pallete.light.primary.main
                      : theme.pallete.light.grey[900]
                  }
                >
                  {value?.length! || props.defaultValue?.length || '0'} / {props.maxLength}
                </PTypo>
              </PBackground>
            </PBox>
          )
        }
      />
    </PBox>
  );
};

const memo: <T>(component: T) => T = ReactMemo;

export const CTextareaMemoized = memo(CTextarea);

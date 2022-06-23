import {theme} from 'constants/theme';
import {memo as ReactMemo} from 'react';
import {Controller} from 'react-hook-form';
import {components} from 'react-select';
import AsyncSelect from 'react-select/async';
import {shortenAddress} from 'utils/shorten-address';
import {transformToSelectValue} from 'utils/transform-to-select-value';
import {PBox} from '../p-box';
import {PTypo} from '../p-typo';
import {selectError as errorStyles, selectStyles as styles} from './p-select.styles';
import {PSelectAsyncProps} from './p-select.types';

const PSelectAsync = <FormValues extends Record<string, unknown>>({
  label,
  placeholder,
  required,
  disabled,
  name,
  rules,
  errors,
  control,
  loadOptions,
}: PSelectAsyncProps<FormValues>) => (
  <PBox display="grid" gap="4px">
    <PBox display="grid" gridAutoFlow="column" justifyContent="start">
      <PTypo
        color={
          disabled ? theme.pallete.light.grey[500] : errors && errors[name] ? theme.pallete.light.error.main : undefined
        }
      >
        {label}
      </PTypo>
      {required && (
        <PBox marginLeft="3px">
          <PTypo color={disabled ? theme.pallete.light.grey[500] : theme.pallete.light.primary.main}>*</PTypo>
        </PBox>
      )}
    </PBox>
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({field}) => (
        <AsyncSelect
          {...field}
          isSearchable={false}
          classNamePrefix="stars"
          className={errors && errors[name] ? errorStyles : ''}
          isDisabled={disabled}
          placeholder={placeholder}
          loadOptions={(_, callback: (options?: any) => void) => {
            (async () => {
              try {
                const response = await loadOptions?.service();
                callback([
                  ...(loadOptions?.preloadedOptions || []),
                  ...(response.data as any).data.map((item: any) =>
                    transformToSelectValue(shortenAddress(item[loadOptions?.labels!])!, item[loadOptions?.values!]!)
                  ),
                ]);
              } catch (e) {
                console.error(e);
              }
            })();
          }}
          defaultOptions
          cacheOptions
          styles={styles}
          closeMenuOnSelect={true}
          hideSelectedOptions={false}
          components={{
            MultiValueContainer: () => null,
            IndicatorSeparator: () => null,
            ClearIndicator: () => null,
            Placeholder: ({...props}: any) => (
              <components.Placeholder {...props}>
                <PTypo color={theme.pallete.light.grey[500]}>{placeholder}</PTypo>
              </components.Placeholder>
            ),
            Option: ({children, ...props}: any) => (
              <components.Option {...props}>
                <PTypo color={theme.pallete.light.grey[900]} variant="body2">
                  {children}
                </PTypo>
              </components.Option>
            ),
          }}
        />
      )}
    />
    {errors && errors[name] && (
      <PTypo variant="body2" color={theme.pallete.light.error.main}>
        {errors && errors[name]?.message}
      </PTypo>
    )}
  </PBox>
);

const memo: <T>(component: T) => T = ReactMemo;

export const PSelectAsyncMemoized = memo(PSelectAsync);

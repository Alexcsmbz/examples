import {theme} from 'constants/theme';
import {memo as ReactMemo} from 'react';
import {Controller} from 'react-hook-form';
import Select, {components} from 'react-select';
import {PBox} from '../p-box';
import {PTypo} from '../p-typo';
import {selectError as errorStyles, selectStyles as styles} from './p-select.styles';
import {PSelectProps} from './p-select.types';

const PSelect = <FormValues extends Record<string, unknown>>({
  label,
  placeholder,
  required,
  disabled,
  options,
  name,
  rules,
  errors,
  control,
  isSearchable = false,
  onChange,
}: PSelectProps<FormValues>) => (
  <PBox display="grid" gap="4px" position="relative" zIndex={5}>
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
          <strong>
            <PTypo color={disabled ? theme.pallete.light.grey[500] : theme.pallete.light.primary.main}>*</PTypo>
          </strong>
        </PBox>
      )}
    </PBox>
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({field}) => (
        <Select
          {...field}
          classNamePrefix="stars"
          className={errors && errors[name] ? errorStyles : ''}
          isDisabled={disabled}
          placeholder={placeholder}
          options={options}
          styles={styles}
          closeMenuOnSelect={true}
          hideSelectedOptions={false}
          isSearchable={isSearchable}
          onChange={e => {
            field.onChange(e);
            onChange && onChange();
          }}
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

export const PSelectMemoized = memo(PSelect);

import {theme} from 'constants/theme';
import {memo} from 'react';
import Select, {components} from 'react-select';
import {PBox} from '../p-box';
import {PCheckmark} from '../p-checkmark';
import {PTypo} from '../p-typo';
import {MultiValue} from './components';
import {selectStyles as styles} from './p-select.styles';
import {PSelectMultiProps} from './p-select.types';

const PSelectMulti = ({label, required, disabled, selectedValues, setSelectedValues, options}: PSelectMultiProps) => (
  <PBox display="grid" gap="4px">
    <PBox display="grid" gridAutoFlow="column" justifyContent="start">
      {required && <PTypo color={disabled ? theme.pallete.light.grey[500] : theme.pallete.light.primary.main}>*</PTypo>}
    </PBox>
    <Select
      classNamePrefix="stars"
      isDisabled={disabled}
      placeholder="Select"
      value={selectedValues}
      options={options}
      onChange={v => setSelectedValues && setSelectedValues(v)}
      styles={styles}
      isMulti
      closeMenuOnSelect={false}
      hideSelectedOptions={false}
      components={{
        MultiValueContainer: () => null,
        IndicatorSeparator: () => null,
        ClearIndicator: () => null,
        Placeholder: ({...props}: any) => (
          <components.Placeholder {...props}>
            <PTypo color={theme.pallete.light.grey[disabled ? 500 : 900]} variant="body2">
              Select
            </PTypo>
          </components.Placeholder>
        ),
        Option: ({children, ...props}: any) => (
          <components.Option {...props}>
            <PBox display="grid" gridAutoFlow="column" alignItems="center" justifyContent="space-between">
              <PTypo color={theme.pallete.light.grey[900]} variant="body2">
                {children}
              </PTypo>
              <PCheckmark type="checkbox" />
            </PBox>
          </components.Option>
        ),
      }}
    />
    <PBox display="grid" gridAutoFlow="column" justifyContent="start" gap="8px">
      {selectedValues?.map(v => (
        <MultiValue
          onCrossClick={value =>
            setSelectedValues && setSelectedValues(selectedValues.filter(v => v.value !== value.value))
          }
          value={v}
        />
      ))}
    </PBox>
  </PBox>
);

export const PSelectMultiMemoized = memo(PSelectMulti);

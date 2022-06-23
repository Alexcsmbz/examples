import {memo} from 'react';
import {PDatepickerProps} from './p-datepicker.types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {cx} from '@emotion/css';
import {container, root, suffix} from './p-datepicker.styles';
import {PBox} from '../p-box';
import {PTypo} from '../p-typo';
import {Icon} from 'assets/icons';
import {labelRequired} from '../p-input/p-input.styles';

const PDatepicker = ({
  label,
  placeholder,
  required,
  tooltip,
  className,
  startDate,
  handleDatePicker,
  ...props
}: PDatepickerProps) => (
  <PBox className={container} display="grid">
    <PBox display="grid" gridAutoFlow="column" justifyContent="start" alignItems="center" gap="16px">
      {label && (
        <label>
          <PTypo>
            {label} <span className={labelRequired}>{required && '*'}</span>
          </PTypo>
        </label>
      )}
      {tooltip && tooltip}
    </PBox>
    <PBox position="relative">
      <DatePicker
        {...props}
        className={cx(root, className)}
        selected={startDate}
        dateFormat="dd/MM/yyyy"
        calendarStartDay={1}
        placeholderText={placeholder || 'Choose date'}
        onChange={date => handleDatePicker && handleDatePicker(date)}
      />
      <Icon.Date className={suffix} />
    </PBox>
  </PBox>
);

export const PDatepickerMemoized = memo(PDatepicker);

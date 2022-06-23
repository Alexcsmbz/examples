import {memo, useState} from 'react';
import {PDropdownProps} from 'components/primitives/p-dropdown/p-dropdown.types';
import {PDropdownD, PDropdownT, PDropdownM} from 'components/primitives/p-dropdown';
import {useCurrentDevice} from 'hooks';

const CDropdown = ({title, content, dropdownClassName}: PDropdownProps) => {
  const {mobile, tablet, desktop} = useCurrentDevice();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return mobile ? (
    <PDropdownM
      title={title}
      content={content}
      dropdownClassName={dropdownClassName}
      dropdownOpen={dropdownOpen}
      onDropdownOpen={() => {
        setDropdownOpen(true);
      }}
      onDropdownClose={() => setDropdownOpen(false)}
    />
  ) : tablet ? (
    <PDropdownT
      title={title}
      content={content}
      dropdownClassName={dropdownClassName}
      dropdownOpen={dropdownOpen}
      onDropdownOpen={() => {
        setDropdownOpen(true);
      }}
      onDropdownClose={() => setDropdownOpen(false)}
    />
  ) : desktop ? (
    <PDropdownD title={title} content={content} dropdownClassName={dropdownClassName} />
  ) : null;
};

export const CDropdownMemoized = memo(CDropdown);

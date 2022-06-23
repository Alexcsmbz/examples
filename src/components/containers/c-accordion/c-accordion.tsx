import {PAccordion} from 'components/primitives/p-accordion';
import {ReactNode, useState} from 'react';

export const CAccordion = ({title, content, open}: {title?: string; content?: ReactNode | string; open?: boolean}) => {
  const [opened, setOpened] = useState(open);

  return <PAccordion open={opened} onClick={() => setOpened(!opened)} title={title} content={content} />;
};

import {PBackButton} from 'components/primitives/p-back-button';
import {ReactNode} from 'react';
import {useNavigate} from 'react-router-dom';

export const CBackButton = ({children, inline}: {children?: ReactNode; inline?: boolean}) => {
  const navigate = useNavigate();

  return (
    <PBackButton inline={inline} onClick={() => navigate(-1)}>
      {children}
    </PBackButton>
  );
};

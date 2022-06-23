import {firstLayer} from './p-footer-subscribe.styles';
import {PBox} from '../p-box';
import {PButton} from '../p-button';
import {PInput} from '../p-input';
import {useForm} from 'react-hook-form';

export type FormSubscibeField = {
  email: string;
};

export const PFooterSubscribe = () => {
  const {register, watch} = useForm<FormSubscibeField>({
    defaultValues: {
      email: '',
    },
  });

  return (
    <PBox display="grid" gridAutoFlow="column">
      <PBox marginRight="-30px">
        <PInput<FormSubscibeField> register={register} name="email" placeholder="Email" size="small" />
      </PBox>
      <PButton variant="primary" size="small" disabled={watch('email') === ''} className={firstLayer}>
        Get
      </PButton>
    </PBox>
  );
};

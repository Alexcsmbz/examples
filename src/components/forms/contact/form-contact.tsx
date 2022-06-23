import {PInput} from 'components/primitives/p-input';
import {PButton} from 'components/primitives/p-button';
import {PBox} from 'components/primitives/p-box';
import {EMAIL_SERVER, MAX_LENGTH_TOKEN_DESCRIPTION} from 'constants/common';
import {useForm} from 'react-hook-form';
import {theme} from 'constants/theme';
import {useState} from 'react';
import {PLoader} from 'components/primitives/p-loader';
import {CTextarea} from 'components/containers/c-textarea';
import {SelectOption} from 'types/custom';
import {PSelect} from 'components/primitives/p-select';
import {contactReasonOptions} from 'constants/contact-reason-options';
import {useCurrentDevice, usePopup} from 'hooks';
import {PopupMessageSent} from 'components/popups/message-sent';
import emailjs from '@emailjs/browser';
import {email, message} from 'constants/regexp-patterns';

export type FormProfileFields = {
  reason: SelectOption | null;
  message: string;
  otherReason: string;
  email: string;
};

export const FormContact = () => {
  const {desktop} = useCurrentDevice();
  const {show} = usePopup();
  const [submitLoading, setSubmitLoading] = useState(false);
  const {
    control,
    register,
    formState: {errors},
    watch,
    handleSubmit,
  } = useForm<FormProfileFields>({
    defaultValues: {
      reason: null,
      otherReason: '',
      message: '',
      email: '',
    },
  });

  const onSubmit = handleSubmit(async data => {
    setSubmitLoading(true);
    try {
      await emailjs.send(
        EMAIL_SERVER.serviceID,
        EMAIL_SERVER.templateID,
        {
          reason: data.reason?.value === 'other' ? data.otherReason : data.reason?.label,
          message: data.message,
          email: data.email,
        },
        EMAIL_SERVER.publicKey
      );
      show(PopupMessageSent);
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitLoading(false);
    }
  });

  return (
    <PBox display="grid" gap="34px">
      <form onSubmit={onSubmit}>
        <PBox display="grid" gap="24px" maxWidth="584px">
          <PSelect<FormProfileFields>
            control={control}
            errors={errors}
            required
            name="reason"
            label="How can we help?"
            placeholder="Not specified"
            options={contactReasonOptions}
            rules={{
              required: 'Fill in required fields',
            }}
          />

          {watch('reason')?.value === 'other' && (
            <CTextarea<FormProfileFields>
              name="otherReason"
              register={register}
              errors={errors}
              placeholder="Specify a reason"
              label="Other reason"
              rows={7}
              maxLength={MAX_LENGTH_TOKEN_DESCRIPTION}
              required={watch('reason')?.value === 'other'}
              rules={{
                validate: {
                  required: value => {
                    if (watch('reason')?.value === 'other' && value === '') return 'Fill in required fields';
                    return true;
                  },
                  correctOtherReason: value =>
                    message.test(value) ||
                    'Invalid message text. Only latin letters, numbers, and special characters are allowed',
                },
              }}
            />
          )}

          <CTextarea<FormProfileFields>
            name="message"
            register={register}
            errors={errors}
            required
            placeholder="Report a problem"
            label="Text message"
            rows={7}
            maxLength={MAX_LENGTH_TOKEN_DESCRIPTION}
            rules={{
              required: 'Fill in required fields',
              validate: {
                correctTextMessage: value =>
                  message.test(value) ||
                  'Invalid message text. Only latin letters, numbers, and special characters are allowed',
              },
            }}
          />

          <PInput<FormProfileFields>
            register={register}
            name="email"
            errors={errors}
            label="Send answer on my e-mail"
            placeholder="Not specified"
            type="email"
            required={
              watch('reason')?.value === 'other' ||
              watch('reason')?.value === 'authorization' ||
              watch('reason')?.value === 'mintIssue' ||
              watch('reason')?.value === 'sellBuyIssue'
            }
            rules={{
              validate: {
                required: value => {
                  if (
                    (watch('reason')?.value === 'other' ||
                      watch('reason')?.value === 'authorization' ||
                      watch('reason')?.value === 'mintIssue' ||
                      watch('reason')?.value === 'sellBuyIssue') &&
                    value === ''
                  )
                    return 'Fill in required fields';
                },
                correctEmail: value =>
                  email.test(value) || 'Invalid email. Only latin letters, numbers, and special characters are allowed',
              },
            }}
          />

          <PBox marginTop="16px">
            <PButton variant="apply" fullWidth={!desktop} disabled={submitLoading} defaultWidth="132px">
              Submit
              {submitLoading && <PLoader bgColor="transparent" stroke={theme.pallete.light.common.white} size={19} />}
            </PButton>
          </PBox>
        </PBox>
      </form>
    </PBox>
  );
};

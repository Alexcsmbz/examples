import {Image} from 'assets/images';
import {NftStandard} from 'constants/common';
import {theme} from 'constants/theme';
import {memo} from 'react';
import {DropzoneState} from 'react-dropzone';
import {DeepMap, FieldError, Path} from 'react-hook-form';
import {PBox} from '../p-box';
import {PButton} from '../p-button';
import {PImage} from '../p-image';
import {PTypo} from '../p-typo';

const PDropzoneM = <FormValues extends Record<string, unknown>>({
  getRootProps,
  getInputProps,
  acceptedFiles,
  open,
  errors,
  name,
  tokenType,
}: DropzoneState & {errors?: Partial<DeepMap<FormValues, FieldError>>; name: Path<FormValues>; tokenType?: string}) => (
  <PBox>
    {acceptedFiles.length === 0 || !!(errors && errors[name]) ? (
      <PBox display="grid" gap="8px 0">
        <PBox display="grid" justifyContent="center" marginBottom="14px">
          {tokenType === 'single' ? (
            <img src={Image.singleTokenType} alt="" />
          ) : tokenType === 'multiple' ? (
            <img src={Image.multipleTokenType} alt="" />
          ) : null}
        </PBox>

        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <PBox textAlign="center">
            <PButton variant="apply-secondary" type="button" fullWidth>
              Choose file
            </PButton>
          </PBox>
        </div>

        <PBox maxWidth="320px" margin="0 auto" textAlign="center">
          <PTypo variant="body2">
            {`Only ${NftStandard.types.map(t => t.extension).join(', ')} files are allowed.`}
          </PTypo>
          <PTypo variant="body2">
            <span>Max size: {NftStandard.size / 1024 / 1024} MB</span>
          </PTypo>
        </PBox>
      </PBox>
    ) : (
      <PBox minHeight="185px" display="grid" textAlign="center" gap="24px">
        <PBox display="grid" justifyContent="center">
          <PImage
            height="424px"
            backgroundColor={theme.pallete.light.common.white}
            image={URL.createObjectURL(acceptedFiles[0])}
          />
        </PBox>
        <PButton defaultWidth="160px" variant="secondary" onClick={open} type="button">
          Change
        </PButton>
      </PBox>
    )}
    {!!(errors && errors[name]?.message) && (
      <PTypo variant="body2" color={theme.pallete.light.error.main}>
        {errors[name]?.message}
      </PTypo>
    )}
  </PBox>
);

export const PDropzoneMMemoized = memo(PDropzoneM);

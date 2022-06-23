import {cx} from '@emotion/css';
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
import {grabbing, root} from './p-dropzone.styles';

const PDropzoneD = <FormValues extends Record<string, unknown>>({
  getRootProps,
  getInputProps,
  isDragActive,
  acceptedFiles,
  open,
  errors,
  name,
}: DropzoneState & {errors?: Partial<DeepMap<FormValues, FieldError>>; name: Path<FormValues>}) => (
  <PBox display="grid" gridAutoFlow="row" gap="4px">
    {acceptedFiles.length === 0 || !!(errors && errors[name]) ? (
      <PBox display="grid" gridTemplateColumns="890px">
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <PBox
            textAlign="center"
            minHeight="185px"
            paddingTop="20px"
            paddingBottom="15px"
            className={cx(root, isDragActive && grabbing)}
          >
            <img src={Image.cloudUpload} alt="" width={36} />
            <PBox maxWidth="407px" margin="16px auto">
              <PTypo variant="body2">
                {isDragActive
                  ? 'Drop the files here ...'
                  : `Only ${NftStandard.types.map(t => t.extension).join(', ')} files are allowed.`}
              </PTypo>
              <PTypo variant="body2">
                <span>Max size: {NftStandard.size / 1024 / 1024} MB</span>
              </PTypo>
            </PBox>
            <PBox display="grid" justifyContent="center">
              {!isDragActive && (
                <PButton variant="apply-secondary" type="button">
                  Open file
                </PButton>
              )}
            </PBox>
          </PBox>
        </div>
      </PBox>
    ) : (
      <PBox minHeight="185px" width="360px" className={cx(root, isDragActive && grabbing)}>
        <PBox padding="6px" display="grid" justifyContent="center">
          <PImage
            height="350px"
            backgroundColor={theme.pallete.light.common.white}
            image={URL.createObjectURL(acceptedFiles[0])}
          />
        </PBox>
        <PButton fullWidth variant="secondary" onClick={open} type="button">
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

export const PDropzoneDMemoized = memo(PDropzoneD);

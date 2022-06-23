import {PDropzoneD, PDropzoneM, PDropzoneT} from 'components/primitives/p-dropzone';
import {useCallback, useEffect, memo as ReactMemo, useMemo} from 'react';
import {useDropzone} from 'react-dropzone';
import {correctNftTokenMessage, NftStandard} from 'constants/common';
import {DeepMap, FieldError, Path, UseFormClearErrors, UseFormSetError} from 'react-hook-form';
import {useCurrentDevice} from 'hooks';

const CDropzone = <FormValues extends Record<string, unknown>>({
  setFiles,
  files,
  setError,
  clearErrors,
  errors,
  name,
  tokenType,
}: {
  setFiles: (files: File[]) => void;
  files: File[];
  setError: UseFormSetError<any>;
  clearErrors: UseFormClearErrors<any>;
  name: Path<FormValues>;
  errors?: Partial<DeepMap<FormValues, FieldError>>;
  tokenType?: string;
}) => {
  const {mobile, tablet, desktop} = useCurrentDevice();
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  }, []);
  const {invalidSize, invalidType} = useMemo(
    () => ({
      invalidType: files[0]?.type && !NftStandard.types.find(t => t.type === files[0]?.type),
      invalidSize: files[0]?.size >= NftStandard.size,
    }),
    [files[0]?.type]
  );
  const {acceptedFiles: aF, ...props} = useDropzone({onDrop, multiple: false});

  useEffect(() => {
    if (invalidSize || invalidType) {
      setFiles([]);
      setError('files', {message: correctNftTokenMessage});
    } else {
      clearErrors('files');
    }
  }, [files, setFiles]);

  return mobile ? (
    <PDropzoneM tokenType={tokenType} acceptedFiles={files} errors={errors} name={name} {...props} />
  ) : tablet ? (
    <PDropzoneT tokenType={tokenType} acceptedFiles={files} errors={errors} name={name} {...props} />
  ) : desktop ? (
    <PDropzoneD acceptedFiles={files} errors={errors} name={name} {...props} />
  ) : null;
};

const memo: <T>(component: T) => T = ReactMemo;

export const CDropzoneMemoized = memo(CDropzone);

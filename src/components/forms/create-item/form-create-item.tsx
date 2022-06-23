import {PInput} from 'components/primitives/p-input';
import {PButton} from 'components/primitives/p-button';
import {PBox} from 'components/primitives/p-box';
import {useState} from 'react';
import {PSelect, PSelectAsync} from 'components/primitives/p-select';
import {useCurrentDevice, usePopup, useProvider} from 'hooks';
import {useSelector} from 'react-redux';
import {CDropzone} from 'components/containers/c-dropzone';
import {getCategoriesService, getCollectionsService} from 'services/app';
import {
  MAX_LENGTH_TOKEN_DESCRIPTION,
  MAX_LENGTH_TOKEN_NAME,
  MAX_QUANTITY_TOKENS,
  MAX_ROYALTY,
  MIN_QUANTITY_TOKENS,
  MIN_ROYALTY,
} from 'constants/common';
import {Blockchain, SelectOption, VariantOfSell, ViewTokenType} from 'types/custom';
import {userAccountSelector} from 'store/user/selectors';
import {useForm} from 'react-hook-form';
import {useParams} from 'react-router-dom';
import {PTextarea} from 'components/primitives/p-textarea';
import {PopupCreateItem} from 'components/popups/create-item';
import {parse} from 'utils/parse-from-numeric-input';
import {connectToWallet} from 'utils/conneсt-to-wallet';
import {PopupSwitchNetwork} from 'components/popups/switch-network';

export type FormCreateItemFields = {
  name: string;
  price: number | '';
  putOnMarketplace: boolean;
  variantOfSell: VariantOfSell;
  category: SelectOption | null;
  collection: SelectOption | null;
  quantity?: number | string;
  description?: string;
  royalty?: number | '';
  files?: File[];
};

export const FormCreateItem = ({chainId}: {chainId: Blockchain['chainId']}) => {
  const {desktop} = useCurrentDevice();
  const {provider, setProvider} = useProvider();
  const {show} = usePopup();
  const {walletConnected} = useSelector(userAccountSelector);
  const [files, setFiles] = useState<File[]>([]);
  const {
    register,
    control,
    formState: {errors},
    setValue,
    handleSubmit,
    reset,
    setError,
    clearErrors,
  } = useForm<FormCreateItemFields>({
    defaultValues: {
      category: null,
      name: '',
      price: '',
      collection: null,
      quantity: '',
      description: '',
      royalty: '',
      files: [],
    },
  });

  const {tokenType} = useParams<{tokenType: ViewTokenType}>();
  const {address} = useSelector(userAccountSelector);

  const onSubmit = handleSubmit(data => {
    if (Number(provider?.chainId) !== Number(chainId)) {
      show(PopupSwitchNetwork, {
        provider,
        chainId: Number(chainId),
        onSwitch: () =>
          show(PopupCreateItem, {
            createdItem: {...data, file: files[0], tokenType: tokenType!, chainId},
            clearForm: () => {
              setFiles([]);
              reset({royalty: '', quantity: ''}, {keepDefaultValues: true});
            },
          }),
      });
    } else {
      walletConnected && files[0]
        ? show(PopupCreateItem, {
            createdItem: {...data, file: files[0], tokenType: tokenType!, chainId},
            clearForm: () => {
              setFiles([]);
              reset({royalty: '', quantity: ''}, {keepDefaultValues: true});
            },
          })
        : connectToWallet(setProvider);
    }
  });

  return (
    <PBox display="grid" gap="34px">
      <CDropzone<FormCreateItemFields>
        setError={setError}
        clearErrors={clearErrors}
        setFiles={setFiles}
        files={files}
        errors={errors}
        name="files"
        tokenType={tokenType}
      />
      <form onSubmit={onSubmit}>
        <PBox display="grid" gap="24px">
          {/* <PBox display="grid" gridAutoFlow="column" justifyContent="start" alignItems="center" gap="16px">
            <PTypo variant="h2">Put on marketplace</PTypo>
            <PSwitcher<FormCreateItemFields> control={control} name="putOnMarketplace" />
            <PTooltip
              title={<Icon.Info />}
              desc="Your item won't be minted in blockchain. Your NFT will be stored for further minting by buyer"
              place="left"
            />
          </PBox>
          {watch('putOnMarketplace') && (
            <PBox display="grid" gridTemplateColumns="repeat(auto-fit, 304px)" margin="0 -12px">
              {variantsOfSell?.map(({name, image}) => (
                <PBox padding="0 12px" key={name}>
                  <label>
                    <PBox
                      display="grid"
                      gridTemplateRows="auto 1fr auto"
                      textAlign="center"
                      overflow="hidden"
                      padding="59px 30px 38px"
                      height="calc(100% - 22px)"
                      marginBottom="22px"
                      cursor="pointer"
                      boxShadow={theme.shadow[1]}
                      borderRadius={theme.radius.main}
                      outline={`1px solid ${
                        getValues('variantOfSell') === name ? theme.pallete.light.primary.light : 'transparent'
                      }`}
                    >
                      <PBox marginBottom="14px">
                        <img src={image} alt="" width="80px" height="80px" />
                      </PBox>
                      <PBox marginBottom="23px">
                        <PTypo variant="h2">{name}</PTypo>
                      </PBox>
                    </PBox>
                    <PCheckmark<FormCreateItemFields>
                      register={register}
                      disabled={name === 'Open for bids' || name === 'Timed auction'}
                      type="radio"
                      name="variantOfSell"
                      className="visually-hidden"
                    />
                  </label>
                </PBox>
              ))}
            </PBox>
          )}
          {watch('putOnMarketplace') && (
            <PBox display="grid" gap="16px">
              {getValues('variantOfSell') === 'Fixed price' && (
                <PBox
                  display="grid"
                  gridTemplateColumns="calc(100% - 182px) 168px"
                  alignItems="start"
                  gap="16px"
                  maxWidth="584px"
                >
                  <PInput<FormCreateItemFields>
                    control={control}
                    errors={errors}
                    name="price"
                    numeric
                    label="Price"
                    required
                    onValueChange={values => {
                      setValue('price', values.floatValue!);
                    }}
                    rules={{
                      required: 'Fill in required fields',
                      min: {value: MIN_TOKEN_PRICE, message: `Price must be more than ${MIN_TOKEN_PRICE} ETH`},
                    }}
                    placeholder="0"
                  />
                  <PSelect control={control} name="currency" label="Currency" disabled placeholder="ETH" />
                </PBox>
              )}
              <PBox display="grid" gridAutoFlow="column" justifyContent="start" alignItems="center" gap="16px">
                <PTypo variant="h2">Service fee 0.75%</PTypo>
                <PTooltip
                  title={<Icon.Info />}
                  desc="The commission is taken by the platform only when the token is sold"
                  place="left"
                />
              </PBox>
            </PBox>
          )} */}
          <PBox display="grid" gap="24px" maxWidth={desktop ? '584px' : ''}>
            <PInput<FormCreateItemFields>
              register={register}
              name="name"
              rules={{
                required: 'Fill in required fields',
                maxLength: {
                  value: MAX_LENGTH_TOKEN_NAME,
                  message: `Name must be shorter than ${MAX_LENGTH_TOKEN_NAME}`,
                },
              }}
              errors={errors}
              required
              label="Token name"
              placeholder="Not specified"
            />
            <PBox zIndex={4}>
              <PSelectAsync<FormCreateItemFields>
                rules={{required: 'Fill in required fields'}}
                errors={errors}
                control={control}
                name="category"
                label="Category"
                required
                loadOptions={{labels: 'name', values: 'id', service: getCategoriesService}}
                placeholder="Select a category"
              />
            </PBox>
            {tokenType === 'multiple' && (
              <PInput<FormCreateItemFields>
                control={control}
                errors={errors}
                name="quantity"
                numeric
                label="Number of copies"
                required
                onValueChange={values => {
                  setValue('quantity', values.floatValue);
                }}
                rules={{
                  required: 'Fill in required fields',
                  min: {
                    value: MIN_QUANTITY_TOKENS,
                    message: `Number of copies must be more than ${MIN_QUANTITY_TOKENS}`,
                  },
                  validate: {
                    max: v =>
                      v &&
                      (parse(v) <= MAX_QUANTITY_TOKENS || `Number of copies must be less than ${MAX_QUANTITY_TOKENS}`),
                    integer: v => {
                      return Number.isInteger(parse(v)) || `Number of copies must be an integer`;
                    },
                  },
                }}
                placeholder="0"
              />
            )}
            {walletConnected ? (
              <PSelectAsync<FormCreateItemFields>
                control={control}
                errors={errors}
                name="collection"
                label="Collection"
                placeholder="Select a collection"
                loadOptions={{
                  labels: 'name',
                  values: 'id',
                  service: () => getCollectionsService({creatorAddress: address, showEmptyCollections: true}),
                  preloadedOptions: [{label: 'Root', value: null}],
                }}
              />
            ) : (
              <PSelect<FormCreateItemFields>
                control={control}
                errors={errors}
                name="collection"
                label="Collection"
                placeholder="Select a collection"
                options={[{label: 'Root', value: null}]}
              />
            )}
            <PTextarea<FormCreateItemFields>
              name="description"
              register={register}
              errors={errors}
              placeholder="Description"
              label="Description"
              rows={7}
              maxLength={MAX_LENGTH_TOKEN_DESCRIPTION}
            />
            <PInput<FormCreateItemFields>
              control={control}
              errors={errors}
              name="royalty"
              numeric
              label="Royalty"
              info="Suggested: 0-15%. Maximum is 15%"
              onValueChange={values => {
                setValue('royalty', values.floatValue);
              }}
              rules={{
                min: {
                  value: MIN_ROYALTY,
                  message: `Royalty must be more than ${MIN_ROYALTY}`,
                },
                validate: {
                  max: v => parse(v) <= MAX_ROYALTY || `Royalty must be less than ${MAX_ROYALTY}%`,
                  integer: v => Number.isInteger(parse(v)) || 'Royalty must be an integer',
                },
              }}
              placeholder="0"
            />
            <PBox display="flex" justifyContent="center">
              <PButton variant="apply" fullWidth={!desktop} disabled={!files[0] || !!errors.files}>
                Create item
              </PButton>
            </PBox>
          </PBox>
        </PBox>
      </form>
    </PBox>
  );
};

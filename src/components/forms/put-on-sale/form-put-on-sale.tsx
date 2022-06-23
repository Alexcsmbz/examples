import {PInput} from 'components/primitives/p-input';
import {PButton} from 'components/primitives/p-button';
import {PBox} from 'components/primitives/p-box';
import {useEffect} from 'react';
import {PTypo} from 'components/primitives/p-typo';
import {PSelect} from 'components/primitives/p-select';
import {PCheckmark} from 'components/primitives/p-checkmark';
import {usePopup, useProvider} from 'hooks';
import {useDispatch, useSelector} from 'react-redux';
import {variantsOfSell} from 'constants/variants-of-sell';
import {appCategoriesSelector, appItemEntitySelector} from 'store/app/selectors';
import {getCategoriesAction} from 'store/app/actions';
import {VariantOfSell} from 'types/custom';
import {theme} from 'constants/theme';
import {useForm} from 'react-hook-form';
import {MAX_QUANTITY_TOKENS, MIN_QUANTITY_TOKENS, MIN_TOKEN_PRICE} from 'constants/common';
import {PopupPutOnSale} from 'components/popups/put-on-sale';
import {PopupSwitchNetwork} from 'components/popups/switch-network';
import {parse} from 'utils/parse-from-numeric-input';
import {NftToken, TokenType} from 'types/api';
import {useSmoothScrollTo} from 'hooks/use-smooth-scroll';
import {Network} from 'constants/network';

export type FormPutOnSaleFields = {
  price: number | '' | string;
  variantOfSell: VariantOfSell;
  quantity?: number | string;
};

export const FormPutOnSale = ({mobile}: {mobile?: boolean}) => {
  const bindScroll = useSmoothScrollTo('put-on-sale');
  const {provider} = useProvider();
  const dispatch = useDispatch();
  const itemEntity = useSelector(appItemEntitySelector);
  const categories = useSelector(appCategoriesSelector);
  const {show} = usePopup();
  const {
    handleSubmit,
    control,
    register,
    setValue,
    getValues,
    reset,
    formState: {errors},
  } = useForm<FormPutOnSaleFields>({
    defaultValues: {price: '', variantOfSell: 'Fixed price', quantity: ''},
  });

  useEffect(() => {
    if (categories.length === 0) dispatch(getCategoriesAction({}));
  }, [categories]);

  const onSubmit = handleSubmit(data => {
    if (Number(provider?.chainId) !== (itemEntity as NftToken).chainId) {
      show(PopupSwitchNetwork, {
        provider,
        chainId: (itemEntity as NftToken).chainId!,
        onSwitch: () => {
          show(PopupPutOnSale, {
            itemEntity: {...data, ...itemEntity},
            clearForm: () => {
              reset({quantity: ''}, {keepDefaultValues: true});
            },
          });
        },
      });

      return;
    }

    show(PopupPutOnSale, {
      itemEntity: {...data, ...itemEntity},
      clearForm: () => {
        reset({quantity: ''}, {keepDefaultValues: true});
      },
    });
  });

  return (
    <section {...bindScroll} className="smooth-scroll-section">
      <form onSubmit={onSubmit}>
        <PBox display="grid" gap="24px">
          <PBox
            display="grid"
            gridTemplateColumns={
              mobile ? 'repeat(auto-fill, minmax(120px, 1fr))' : 'repeat(auto-fill, minmax(135px, 1fr))'
            }
            gap={mobile ? '0 15px' : '16px'}
            maxWidth={mobile ? '100%' : '584px'}
          >
            {variantsOfSell?.map(({name, image}) => (
              <label key={name}>
                <PBox
                  display="grid"
                  alignItems="center"
                  justifyItems="center"
                  gap="4px"
                  padding="24px 16px"
                  cursor="pointer"
                  boxShadow={theme.shadow[1]}
                  borderRadius={theme.radius.main}
                  outline={`1px solid ${
                    getValues('variantOfSell') === name ? theme.pallete.light.primary.light : 'transparent'
                  }`}
                >
                  <img src={image} width={40} height={40} alt={name} />
                  <PTypo bold>{name}</PTypo>
                </PBox>
                <PCheckmark<FormPutOnSaleFields>
                  register={register}
                  disabled={name === 'Open for bids' || name === 'Timed auction'}
                  type="radio"
                  name="variantOfSell"
                  className="visually-hidden"
                />
              </label>
            ))}
          </PBox>
          <PBox display="grid" gap="16px" maxWidth="590px">
            <PBox
              display="grid"
              gridTemplateColumns={mobile ? 'calc(100% - 137px) 120px' : 'calc(100% - 182px) 168px'}
              alignItems="start"
              gap="16px"
              maxWidth="584px"
            >
              <PInput<FormPutOnSaleFields>
                register={register}
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
                  min: {
                    value: MIN_TOKEN_PRICE,
                    message: `Price must be more than ${MIN_TOKEN_PRICE} ${
                      Network[(itemEntity as NftToken)?.nftTokenDetail?.chainId!]?.currency.name
                    }`,
                  },
                }}
                placeholder="0"
              />
              <PSelect
                control={control}
                name="currency"
                label="Currency"
                disabled
                placeholder={Network[(itemEntity as NftToken)?.nftTokenDetail?.chainId!]?.currency.name}
              />
            </PBox>
            {itemEntity?.tokenType === TokenType.ERC1155 && (
              <PInput<FormPutOnSaleFields>
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
                      parse(v) <= MAX_QUANTITY_TOKENS || `Number of copies must be less than ${MAX_QUANTITY_TOKENS}`,
                    integer: v => Number.isInteger(parse(v)) || 'Number of copies must be an integer',
                  },
                }}
                placeholder="0"
              />
            )}

            <PBox display="grid" justifySelf="start" gridAutoFlow="column" gap="16px">
              <PButton variant="apply" defaultWidth="131px">
                Put on sale
              </PButton>
            </PBox>
          </PBox>
        </PBox>
      </form>
    </section>
  );
};

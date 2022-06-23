import {PInput} from 'components/primitives/p-input';
import {PButton} from 'components/primitives/p-button';
import {PBox} from 'components/primitives/p-box';
import {memo} from 'react';
import {PSelect, PSelectAsync} from 'components/primitives/p-select';
import {useForm} from 'react-hook-form';
import {MIN_TOKEN_PRICE} from 'constants/common';
import {MarketItem, NftToken} from 'types/api';
import Web3 from 'web3';
import {usePopup, useProvider} from 'hooks';
import {useSelector} from 'react-redux';
import {parse} from 'utils/parse-from-numeric-input';
import {PopupEditItem} from 'components/popups/edit-item';
import {appItemEntitySelector} from 'store/app/selectors';
import {SelectOption} from 'types/custom';
import {getCategoriesService} from 'services/app';
import {PopupSwitchNetwork} from 'components/popups/switch-network';
import {useSmoothScrollTo} from 'hooks/use-smooth-scroll';
import {Network} from 'constants/network';

export type FormEditItemFields = {
  price: number | string;
  categories: SelectOption | null;
};

const FormEditItem = ({mobile}: {mobile?: boolean}) => {
  const bindScroll = useSmoothScrollTo('edit-item');
  const {provider} = useProvider();
  const itemEntity = useSelector(appItemEntitySelector);
  const {
    handleSubmit,
    setValue,
    control,
    reset,
    getValues,
    formState: {errors, isDirty},
  } = useForm<FormEditItemFields>({
    defaultValues: {
      price: '',
      categories: null,
    },
  });
  const {show} = usePopup();

  const onSubmit = handleSubmit(async data => {
    if (Number(provider?.chainId) !== (itemEntity as MarketItem)?.nftToken?.chainId && getValues('price')) {
      show(PopupSwitchNetwork, {
        provider,
        chainId: (itemEntity as NftToken).chainId! || (itemEntity as MarketItem)?.nftToken?.chainId!,
        onSwitch: () => {
          show(PopupEditItem, {
            itemEntity: {...itemEntity, ...data},
            clearForm: () => {
              reset({}, {keepDefaultValues: true});
            },
          });
        },
      });

      return;
    }

    if (getValues('price') || getValues('categories')) {
      show(PopupEditItem, {
        itemEntity: {...itemEntity, ...data},
        clearForm: () => {
          reset({}, {keepDefaultValues: true});
        },
      });
    }
  });

  return (
    <section {...bindScroll} className="smooth-scroll-section">
      <form onSubmit={onSubmit}>
        <PBox display="grid" gap="24px">
          <PBox
            display="grid"
            gridTemplateColumns={mobile ? 'calc(100% - 137px) 120px' : 'calc(100% - 182px) 168px'}
            alignItems="start"
            gap="0 16px"
            maxWidth={mobile ? '100%' : '584px'}
          >
            {(itemEntity as MarketItem)?.seller && (
              <>
                <PInput<FormEditItemFields>
                  control={control}
                  errors={errors}
                  name="price"
                  numeric
                  label="New price"
                  onValueChange={values => {
                    setValue('price', values.floatValue!);
                  }}
                  rules={{
                    min: {
                      value: MIN_TOKEN_PRICE,
                      message: `Price must be more than ${MIN_TOKEN_PRICE} ${
                        Network[(itemEntity as MarketItem)?.nftToken?.nftTokenDetail?.chainId!]?.currency.name
                      }`,
                    },
                    validate: {
                      equal: v => {
                        return (
                          parse(v) !==
                            Number(Web3.utils.fromWei((itemEntity as MarketItem)?.price! as string, 'ether')) ||
                          'Prices should not be equal'
                        );
                      },
                    },
                  }}
                  placeholder="0"
                />
                <PSelect
                  control={control}
                  name="currency"
                  label="Currency"
                  disabled
                  placeholder={Network[(itemEntity as MarketItem)?.nftToken?.nftTokenDetail?.chainId!]?.currency.name}
                />
              </>
            )}

            <PSelectAsync<FormEditItemFields>
              control={control}
              name="categories"
              label="Change category"
              placeholder="Choose category"
              loadOptions={{labels: 'name', values: 'id', service: getCategoriesService}}
            />
          </PBox>
          <PBox display="grid" justifySelf="start">
            <PButton variant="apply" disabled={!isDirty}>
              Update changes
            </PButton>
          </PBox>
        </PBox>
      </form>
    </section>
  );
};

export const FormEditItemMemoized = memo(FormEditItem);

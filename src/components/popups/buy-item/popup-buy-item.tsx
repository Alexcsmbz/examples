import {PopupBase} from '../base';
import {PBox} from 'components/primitives/p-box';
import {PTypo} from 'components/primitives/p-typo';
import {memo} from 'react';
import {ABI_MARKET} from 'constants/abis';
import {MarketItem, TokenType} from 'types/api';
import Web3 from 'web3';
import {useForm} from 'react-hook-form';
import {postNftTokenPendingService} from 'services/app';
import {useContract, useToast} from 'hooks';
import {useNavigate} from 'react-router-dom';
import {Route} from 'constants/routes';
import {toastMessage} from 'constants/toast-message';
import {PInput} from 'components/primitives/p-input';
import {MAX_QUANTITY_TOKENS, MIN_QUANTITY_TOKENS} from 'constants/common';
import {parse} from 'utils/parse-from-numeric-input';
import {Network} from 'constants/network';

type FormBuyFields = {
  quantity?: number | string;
};

const PopupBuyItem = ({onClose, item}: {onClose: () => void; item: MarketItem}) => {
  const contractMarket = useContract(Network[item.nftToken?.nftTokenDetail?.chainId!].marketAddress, ABI_MARKET);
  const {
    handleSubmit,
    watch,
    control,
    setValue,
    formState: {errors},
  } = useForm<FormBuyFields>({
    defaultValues: {quantity: ''},
  });
  const {showPending, showError, showSuccess} = useToast();
  const navigate = useNavigate();

  const buy = async (data: FormBuyFields) => {
    const stateFormData = new FormData();
    stateFormData.append('nftTokenId', item?.nftTokenId!);

    let tx: any;

    if (item.tokenType === TokenType.ERC721) {
      tx = await contractMarket?.buyMarketItem721(item.itemId, {value: item.price});
    }

    if (item.tokenType === TokenType.ERC1155) {
      tx = await contractMarket?.buyMarketItem1155(item.itemId, data.quantity?.toString(), {
        value: Web3.utils.toWei(
          (Number(data.quantity!) * Number(Web3.utils.fromWei(item?.price as string, 'ether'))).toString(),
          'ether'
        ),
      });
    }

    stateFormData.append('transactionHash', tx?.hash);

    await postNftTokenPendingService(stateFormData);

    navigate(Route.myCollections.path);

    await new Promise(resolve => {
      contractMarket?.on('MarketItemClosed', () => {
        resolve(null);
      });
    });
  };

  const onSubmit = handleSubmit(async data => {
    onClose();
    showPending(toastMessage.pending.buy);

    try {
      await buy(data);
      showSuccess();
    } catch (e) {
      console.error(e);
      showError();
    }
  });

  return (
    <PopupBase
      onSubmit={onSubmit}
      imageSrc={item.nftToken?.nftTokenDetail?.imageUri!}
      title="Buy item"
      onCrossClick={onClose}
      open
      buttons={{
        confirm: {
          name: 'Continue',
        },
        reject: {
          name: 'Cancel',
          onClick: onClose,
        },
      }}
    >
      <>
        <PBox display="grid" gap="12px">
          {item?.tokenType === TokenType.ERC1155 && (
            <PInput<FormBuyFields>
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
          <PBox textAlign="center">
            <PTypo variant="h3">Do you want buy a token {item.nftToken?.nftTokenDetail?.name}</PTypo>
            <PTypo variant="h3">
              {`worth ${
                (Number(watch('quantity')!) || 1) * Number(Web3.utils.fromWei(item?.price as string, 'ether')) || 0
              } ${Network[item?.nftToken?.nftTokenDetail?.chainId!]?.currency.name}?`}
            </PTypo>
          </PBox>
        </PBox>
      </>
    </PopupBase>
  );
};

export const PopupBuyItemMemoized = memo(PopupBuyItem);
